const express = require('express');
const next = require('next');
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cors = require("cors");
const customerRoute = require('./backend/routes/customerRoute');
const catalogRoute = require('./backend/routes/catalogRoute');
dotenv.config({ path: "./backend/config/config.env" });
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const path = require('path');
const connectDB = require("./backend/config/db");
// const config = require("./src/config.js");
app.prepare().then(() => {
  const server = express();
  server.use(morgan('dev'))
  server.use(express.json());
  server.use(cors());
  server.use(bodyParser.json());
  server.use(express.static(path.join(__dirname, 'public')))
  connectDB();
  // Define your API routes here
  // console.log(config.apiUrl)
  server.use('/api/v1/customer', customerRoute);
  server.use('/api/v1/catalog', catalogRoute);
  // server.get('/api/hello', (req, res) => {
  //   res.send({ message: 'Hello from the server!' });
  // });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
