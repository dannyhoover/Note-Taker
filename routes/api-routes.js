const path = require("path");
const fs = require("fs");
const express = require("express");
const router = express.Router();

const dbPath = path.resolve(__dirname, "../db/db.json");

router.get("/notes", function(req, res) {
  fs.readFile(dbPath, "utf8", function(err, data) {
    const notes = JSON.parse(data) || [];
    notes.forEach(function(note, i) {
      note.id = i+1;
    });
    res.json(notes);
  });
});

router.post("/notes", function(req, res) {
  const newNote = req.body;
  fs.readFile(dbPath, "utf8", function(err, data) {
    const notes = JSON.parse(data) || [];
    notes.push(newNote);
    fs.writeFileSync(dbPath, JSON.stringify(notes), "utf8");
    res.end();
  });
});

router.delete("/notes/:id", function(req, res) {
  const id = +req.params.id;
  fs.readFile(dbPath, "utf8", function(err, data) {
    const notes = JSON.parse(data) || [];
    notes.splice(id-1, 1);
    fs.writeFileSync(dbPath, JSON.stringify(notes), "utf8");
    res.end();
  });
});

module.exports = router;