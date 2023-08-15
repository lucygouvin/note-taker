const router = require("express").Router();
const uuid = require("../helpers/uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

router.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

router.post("/", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title: title,
      text: text,
      id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");

    const success = {
      status: "success",
      body: newNote,
    };
    res.json(success);
  } else {
    res.json("An error occurred while saving note.");
  }
});

router.delete("/:id", (req, res) => {
  readFromFile("./db/db.json").then((response) => {
    notes = JSON.parse(response);
    let deleted = false;
    notes.forEach((note) => {
      if (note.id === req.params.id) {
        const index = notes.indexOf(note);
        notes.splice(index, 1);
        deleted = true;
      }
    });
    if (deleted) {
      writeToFile("./db/db.json", notes);

      const success = {
        status: "success",
      };
      res.json(success);
    } else {
      res.json("An error occurred while deleting note.");
    }
  });
});

module.exports = router;
