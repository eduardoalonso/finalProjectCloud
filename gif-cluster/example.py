import zipfile
from PIL import Image, ImageSequence, ImageFilter
from google.cloud import storage
from mpi4py import MPI
import os
import shutil
import urllib.request

def zipdir(path, ziph):
    # ziph is zipfile handle
    for root, dirs, files in os.walk(path):
        for file in files:
            ziph.write(os.path.join(root, file))

def reemovNestings(l): 
    for i in l: 
        if type(i) == list: 
            reemovNestings(i) 
        else: 
            output.append(i) 

comm = MPI.COMM_WORLD
size = comm.size
rank = comm.rank
name = MPI.Get_processor_name()

output = []

if rank == 0:
    foo = []
    resp = urllib.request.urlopen("https://storage.googleapis.com/bucker-ejemplo-1//pro2.gif")
    im = Image.open(resp)
    im.load()

    for frame in ImageSequence.Iterator(im):
        foo.append(frame.convert('RGB'))

    chunks = [[] for _ in range(size)]

    for i, chunk in enumerate(foo):
        chunks[i % size].append(chunk)

else:
    chunks = None
    foo = None

foo = comm.scatter(chunks, root=0)

for i in range(len(foo)):
    foo[i] = foo[i].filter(ImageFilter.BLUR)

fooFilter = []
fooFilter = comm.gather(foo, root=0)

if rank == 0:
    os.mkdir('images')
    #Not_none_values = filter(None.__ne__, fooFilter)
    #fooFilter = list(Not_none_values)
    reemovNestings(fooFilter)
    fooFilter = output
    im.save('images/out1.gif', save_all=True, append_images=fooFilter, quality = 95)
    
    if __name__ == '__main__':
        zipf = zipfile.ZipFile('Images.zip', 'w', zipfile.ZIP_DEFLATED)
        zipdir('images/', zipf)
        zipf.close()

    shutil.rmtree('images')
    archive = zipfile.ZipFile('Images.zip', 'r')

    storage_client = storage.Client.from_service_account_json("keys.json")
    bucket = storage_client.get_bucket("bucker-ejemplo-1")
    filename = "%s/%s" % ('', "Images.zip")
    blob = bucket.blob(filename)
    blob.upload_from_filename('Images.zip')
    os.remove('Images.zip')

    response = urllib.request.urlretrieve('https://storage.googleapis.com/bucker-ejemplo-1//Images.zip', 'Images.zip')
