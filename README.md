# Satakolkyt Map Backend

## Development

### .env file

Make an `.env` script to the root of the project directory with these fields.

```sh
PORT=8089
DB_USER='root'
DB_PASS='root'
DB_URL='http://127.0.0.1:8529'
DB_NAME='satakolkyt'
```

Please different credentials on production!

### Getting started

- `$ yarn` to install dependencies.
- `$ yarn run db:start` to start and initialize the database.
- `$ yarn run dev` to start the server with nodemon.
