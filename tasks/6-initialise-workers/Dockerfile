FROM python

WORKDIR /golem/work
VOLUME /golem/input

COPY Dockerfile /golem/info/image-info
COPY test-data.txt /golem/work/test-data.txt
COPY similarities.py /golem/work/similarities.py
COPY requirements.txt /golem/work/requirements.txt
COPY db.csv /golem/work/db.csv


RUN pip install -r requirements.txt
