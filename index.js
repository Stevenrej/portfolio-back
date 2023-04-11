require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const emailRouter = require('./emailRouter');

const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

app.use(emailRouter);

app.get('/', (req, res) => {
  res.send('Portfolio Server');
});

app.get('/start-server', (req, res) => {
  // If the server is already running, return a success message
  if (app.serverRunning) {
    return res.send({ message: 'Server already running' });
  }

  app.server = app.listen(3001, () => {
    console.log('Server listening on port 3001');
    app.serverRunning = true;
    return res.send({ message: 'Server started' });
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  if (app.serverRunning) {
    return res.send({ status: 'ok' });
  } else {
    return res.status(500).send({ status: 'error' });
  }
});

app.server = app.listen(3001, () => {
  console.log('Server listening on port 3001');
  app.serverRunning = true;
});

module.exports = app;
