const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

// Helper method for generating unique ids
const uuid = require('./public/assets/js/helpers/uuid');

const PORT = 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET route for html files
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get("/notes", (req, res)  =>
  res.sendFile(path.join(__dirname, "/public/index.html"))

);

// GET route using DB.JSON file
app.get("/api/notes",(req, res)  =>
fs.readFile(path.join(__dirname, './db/db.json'), "utf-8", function(err, data) {
  const Jnotes = JSON.parse(data);
  res.json(Jnotes);
}));

//the server to start listening
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);