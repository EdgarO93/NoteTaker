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

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))

);

// GET route using DB.JSON file
app.get("/api/notes", (req, res) =>
  fs.readFile(path.join(__dirname, './db/db.json'), "utf-8", function (err, data) {
    const notes = JSON.parse(data);
    res.json(notes);
  }));

// poste route using DB.JSON file
app.post('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, './db/db.json'), "utf-8", function (err, data) {
    if (err) {
      console.log(err);
  }
    const notes = JSON.parse(data);
    console.log('parse done', notes)
    const noteRequest = req.body;
    const newNote = {
      id: uuidd(),
      title: noteRequest.title,
      text: noteRequest.text,
    };
    notes.push(newNote);
    res.json(newNote);

    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notes, null, 2), "utf-8", (function (err) {
      if (err) throw err; console.log("new note added!")
    }));
  });

});

// Fallback route for when a user attempts to visit routes that doesn't exist
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
  console.log("Link not found, returning home")
});

//the server to start listening
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);