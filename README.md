# demo-scheduler

A demo application using the MERN stack that takes in a csv file to store availability of providers and allows clients to book times to meet with them.

## Getting started

### Create .env file

Should have the following env vars:

```
DB_USER={YOUR_DB_USER}
DB_PASSWORD={YOUR_DB_PASSWORD}
DB_NAME={YOUR_DB_NAME}
DB_CLUSTER_URL={YOUR_DB_CLUSTER_URL}
PORT=3000
```

### Set up a MongoDB instance

I recommend using the [MongoDB Cloud](https://www.mongodb.com/cloud) to get started. It has a free tier and is easy to set up.

Get your DB-specific env vars from here.

### Running the app

1. Run `npm run install-all` (installs dependencies for the server and client)
1. Run `npm start`
1. Visit http://localhost:3000 (or whatever you set your PORT to in your .env file)
