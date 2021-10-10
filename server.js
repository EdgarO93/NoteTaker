const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

// Helper method for generating unique ids
const uuid = require('../assets/js/helpers/uuid');

const PORT = 3001;

const app = express();

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/notes.html'))
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);