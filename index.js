//This is the Web Server

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import client from './db/client.js';
import apiRouter from './api/index.js';
import { fileURLToPath } from 'url';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();

//enables cross-origin resource sharing to proxy api requests
//from localhost:3000 to localhost:4000 in local dev env

server.use(cors());

// create logs for everything
server.use(morgan('dev'));

//handles application/json requests
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use((req, res, next) => {
  console.log('BODY LOGGER START');
  console.log(req.body);
  console.log('BODY LOGGER END');
  next();
});

//here's our static files

server.use(express.static(path.join(__dirname, 'build')));

//here's the API
server.use(apiRouter);
// server.use("/api", require("./api"));

server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//bring in the DB connection
// const { clientK } = require("./db");

//connect to the server
export const PORT = process.env.PORT || 4000;

// define a serer handle to close open tcp connection after unit tests have run
export const handle = server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);
  try {
    await client.connect();
    console.log('Database is open for business!');
  } catch (error) {
    console.error('Database is closed for repairs!\n', error);
  }
});
