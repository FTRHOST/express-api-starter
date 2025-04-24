// Suggested code may be subject to a license. Learn more: ~LicenseLog:1553915142.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1793178327.
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const fs = require('fs');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());



app.get('/', (req, res) => {
    fs.readFile('./src/database/blog.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to read data file' });
          return;
        }
        const jsonData = JSON.parse(data);
        res.json(jsonData);
  });

});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
