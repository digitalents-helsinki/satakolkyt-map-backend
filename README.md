# Satakolkyt -app (backend)

## Development

### .env file

Make an `.env` script to the root of the project directory with these fields.

```sh
PORT=8089
DB_USER='root'
DB_PASS='root'
DB_URL='http://localhost:8529'
DB_NAME='satakolkyt'
FRONT_USER='test'
FRONT_PASS='test'
SECRET='test'
JWT_SECRET='test'
EMAIL_PASS='ignore'
```

Please different credentials on production!

### Getting started

- `$ yarn` to install dependencies.
- `$ yarn run db:start` to start and initialize the database and express (See /starth.sh script.)
- `$ yarn run db:populate-geojson` to populate with default geojson data from the `scripts/data/geo.json` file.

### ArangoDB

Once you've initiated ArangoDB using the `start.sh` script and everything went well, you should be able to use the database dashboard by navigating to http://127.0.0.1:8529. The user/pass/database is whatever you used in the .env file (`DB_USER`/`DB_PASS`/`DB_NAME`, respectively.)
