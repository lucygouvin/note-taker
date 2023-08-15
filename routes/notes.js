// require .Router()
const router = require("express").Router();
// require helper functions for creating the unique note ids, and for reading/writing/appending to files
const uuid = require("../helpers/uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

// Handle get request to /api/notes
router.get("/", (req, res) => {
    //read the db.json file and return it in the response as JSON
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// Handle post request to /api/notes
router.post("/", (req, res) => {
// destructure the request body
  const { title, text } = req.body;
// Short circuit to ensure that the request body is valid
  if (title && text) {
    // repackage the request body into a new object, plus a unique id, to be passed back into the file
    const newNote = {
      title: title,
      text: text,
      id: uuid(),
    };

    // read the existing db.json and add the new note to the end
    readAndAppend(newNote, "./db/db.json");

    const success = {
      status: "success",
      body: newNote,
    };
    // send a response with the success object if operation was successful
    res.json(success);
  } else {
    // send back a response with an error message if request body was not valid
    res.json("An error occurred while saving note.");
  }
});

// Handle delete requests to /api/notes
router.delete("/:id", (req, res) => {
// read the db.json file, save it to notes
  readFromFile("./db/db.json").then((response) => {
    const notes = JSON.parse(response);
    let deleted = false;
    // for every object in the notes list, check to see if its id matches the id passed in the request
    notes.forEach((note) => {
      if (note.id === req.params.id) {
        const index = notes.indexOf(note);
        notes.splice(index, 1);
        deleted = true;
      }
    });
    if (deleted) {
    // write the file again, with the specified note removed
      writeToFile("./db/db.json", notes);

      const success = {
        status: "success",
      };
    // send a response with the success object if something was deleted
      res.json(success);
    } else {
    // send a response with an error message if nothing was deleted
      res.json("An error occurred while deleting note.");
    }
  });
});

module.exports = router;
