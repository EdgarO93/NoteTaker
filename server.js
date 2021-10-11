const express = require('express');
const path = require('path');
const fs = require('fs');
// const util = require('util');
// const noteData = require('./db/db.json')

// Helper method for generating unique ids
const uuid = require('./public/assets/js/helpers/uuid');

const PORT = process.env.port || 80;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// returns notes.html
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'), console.log("going to notes"))

);

// GET route using DB.JSON file
app.get("/api/notes", (req, res) =>
  fs.readFile(path.join(__dirname, './db/db.json'), "utf-8", function (err, data) {
    if (err) {
      throw err;
    }
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
      id: uuid(),
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

// route to return the index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'), console.log("going home")));


// delete request to delete note by id by grabbing JSON
app.delete("/api/notes/:id", (req, res) => {
  // get JSON data and then parsed to noteParser
  let noteData = fs.readFileSync('./db/db.json');  
  let noteParser = JSON.parse(noteData);
   // creating new array that was parsedINT
  const notesReceived = noteParser.filter(n => parseInt(n.id) !== parseInt(req.params.id)); 
  // new array is being indexedOf so that the ID position is received to notesIndex
  const notesIndex = noteParser.indexOf(notesReceived);   
  // an updated noteParser array is being returned with the splice and without the deleted nte 
  noteParser.splice(notesIndex);
  //  rerites db.json file with noteParser
  fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(noteParser), (err, data) => 
  { if (err) throw err; res.json(noteParser) });
  res.sendFile(path.join(__dirname,'public/notes.html')); 
});



//the server to start listening
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);