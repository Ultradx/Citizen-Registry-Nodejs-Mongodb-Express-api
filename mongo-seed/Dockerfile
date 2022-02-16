FROM mongo

COPY init.json /init.json

CMD mongoimport --host mongodb --db mongodb --collection init --type json --file /init.json --jsonArray