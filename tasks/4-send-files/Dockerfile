FROM node:latest
RUN apt-get update && apt-get install -y tesseract-ocr imagemagick

WORKDIR /golem/work
VOLUME /golem/work

CMD ["tesseract"]
