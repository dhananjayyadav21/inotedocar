const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//====== Rout 1: get all notes from database using GET:api/notes/fetchallnotes with user id
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
    // handle internal error
  } catch (error) {
    res.status(500).send("some internal server error accrued");
  }
});

//====== Rout 2: add notes using POST:api/notes/addnote
router.post(
  "/addnote",
  fetchuser,
  [
    body("title").isLength({ min: 3 }),
    body("discription").isLength({ min: 5 }),
  ],

  async (req, res) => {
    try {
      const { title, discription, tag } = req.body;

      //======== if there are errors accrued shoe bad request and errors
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
      }

      // create a new note
      const note = new Notes({
        title,
        discription,
        tag,
        user: req.user.id,
      });

      //========== save notes
      const saveNotes = await note.save();
      res.json(saveNotes);

      // handle internal error
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some internal server error accrued");
    }
  }
);

//====== Rout 3: update an existing notes using PUT:api/notes/updatenote
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, discription, tag } = req.body;

    // create a new note
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (discription) {
      newNote.discription = discription;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // find note using user id from db
    let note = await Notes.findById(req.params.id);

    // handle varias cases when id not match
    if (!note) {
      return res.status(404).send("Not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Somthing Wrong");
    }

    // update and save notes on db
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json(note);

    // handle internal error
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some internal server error accrued");
  }
});

//====== Rout 4: Delete an existing notes using DELETE:api/notes/updatenote
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, discription, tag } = req.body;

    // find note using user id from db
    let note = await Notes.findById(req.params.id);

    //check write user which is delete notes
    if (!note) {
      return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Somthing Wrong");
    }

    // update and save notes on db
    note = await Notes.findByIdAndDelete( req.params.id );

    res.json(note);

    // handle internal error
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some internal server error accrued");
  }
});

module.exports = router;
