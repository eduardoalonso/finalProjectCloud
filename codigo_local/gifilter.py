from PIL import Image, ImageSequence, ImageFilter
from pillow_lut import rgb_color_enhance
import zipfile
import os
import shutil

def zipdir(path, ziph):
    # ziph is zipfile handle
    for root, dirs, files in os.walk(path):
        for file in files:
            ziph.write(os.path.join(root, file))

im = Image.open("giorno.gif")
im.load()

os.mkdir('zipgen')
foo=[]

"""
index = 0
for frame in ImageSequence.Iterator(im):
    foo.append(frame)
    foo[index] = foo[index].convert('RGB')
    foo[index] = foo[index].filter(ImageFilter.EDGE_ENHANCE_MORE)
    foo[index].save("zipgen/test%rbgblur.png" % index)
    index += 1
"""

index = 0
for frame in ImageSequence.Iterator(im):
    foo.append(frame)
    foo[index] = foo[index].convert('YCbCr')
    lut = rgb_color_enhance(30.5, brightness=0.5,exposure=0,contrast=2,warmth=0.5,saturation=2,vibrance=1,hue=0,
                            gamma=1.0,linear=False)
    foo[index] = foo[index].filter(lut)
    foo[index].save("zipgen/test%rbgblur.jpg" % index)
    index += 1


im2 = foo[0]
im2.save('zipgen/out.gif', save_all=True, append_images=foo)

print(foo)

"""
if __name__ == '__main__':
    zipf = zipfile.ZipFile('Python.zip', 'w', zipfile.ZIP_DEFLATED)
    zipdir('zipgen/', zipf)
    zipf.close()

shutil.rmtree('zipgen')
"""