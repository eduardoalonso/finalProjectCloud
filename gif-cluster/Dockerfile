FROM python

RUN apt-get update

RUN yes | apt install mpich
RUN yes | pip3 install mpi4py
RUN yes | pip3 install Pillow
RUN yes | pip install --upgrade google-cloud-storage

ADD example.py /gif-cluster/example.py
ADD keys.json /gif-cluster/keys.json
RUN apt-get install -y openssh-server

# 2. Configurar sshd
RUN mkdir /var/run/sshd

RUN echo 'root:SergioEsElMejorProfeDelTec' | chpasswd
RUN sed -i 's/PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd
WORKDIR /gif-cluster

RUN mkdir -p /root/.ssh/
ADD gif_cluster.pub gif_cluster.pub
ADD gif_cluster gif_cluster
# 3. Agregar las claves privada /publica de ssh
RUN cat gif_cluster.pub >> /root/.ssh/authorized_keys
RUN cp gif_cluster /root/.ssh/id_rsa
RUN cp gif_cluster.pub /root/.ssh/id_rsa.pub

RUN chmod 600 /root/.ssh/id_rsa

COPY ssh_config /etc/ssh/ssh_config

EXPOSE 22
RUN service ssh restart

CMD tail -f /dev/null
