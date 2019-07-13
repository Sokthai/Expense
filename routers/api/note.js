const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");
const Note = require("../../models/Note");
const auth = require("../../middleware/auth");


// @router  POST api/note
// @desc    Create note
// @access  private
router.post("/", [auth,
    check("note", "Note is required").not().isEmpty(),
    check("subject", "subject is required").not().isEmpty()
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()});
        }
        try {
            let notes = await Note.findOne({user: req.user.id});
            const {note, subject} = req.body;
            const noteField = {note, subject};
            
            if (!notes){
                notes = new Note();
                notes.user = req.user.id;
            }

            notes.note.unshift(noteField);
            await notes.save();
            res.status(200).json(notes);
          

        } catch (error) {
            console.error(error.message);
            res.status(500).json("Server Error");
        }
})



// @router  PUT api/note/:id
// @desc    Update a note
// @access  private
router.put("/:id", [auth,
    check("note", "Note is required").not().isEmpty(),
    check("subject", "subject is required").not().isEmpty()
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()});
        }
        
        const _id = req.params.id;
        const {note, subject} = req.body;
        const notesField = {note, subject};

    try {
        const notes = await Note.findOne({user: req.user.id});
        if (!notes || notes === null){
            return res.status(400).json("No note found")
        }
        const updateIndex = notes.note.map(note => note._id).indexOf(_id);
        notes.note[updateIndex] = notesField;
        notes.save();
        res.status(200).json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error");
    }
})

// @router  DELETE api/note/:id
// @desc    Delete a note
// @access  private
router.delete("/:id", auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const notes = await Note.findOne({user: req.user.id});
        if (!notes || notes === null){
            return res.status(400).json("No note found")
        }
        const deleteIndex = notes.note.map(note => note._id).indexOf(_id);
        notes.note.splice(deleteIndex, 1);
        console.log(deleteIndex);
        notes.save();
        res.status(200).json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error");
    }
})


// @router  DELETE api/note
// @desc    Delete all notes
// @access  private
router.delete("/", auth, async (req, res) => {
    try {
        await Note.findOneAndRemove({user: req.user.id});
        res.status(200).json("All notes are deleted");
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error");
    }
})


// @router  GET api/note/
// @desc    get all note from current user
// @access  private
router.get("/", auth, async (req, res) => {
    try {
        const notes = await Note.findOne({user: req.user.id}).populate("user", ["username", "avatar"]);
        if (!notes || notes === null){
            return res.status(400).json("Note not found");
        }
        res.status(200).json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error");
    }
})

// @router  GET api/note/:id
// @desc    get a note from current user
// @access  private
router.get("/:id", auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const notes = await Note.findOne({user: req.user.id}).populate("user", ["username", "avatar"]);
        if (!notes || notes === null){
            return res.status(400).json("Note not found");
        }
        const note = notes.note.filter(note => note._id == _id);

        res.status(200).json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).json("Server Error");
    }
})





module.exports = router;


//mon birth cert (khmer and eng orig)
//mon marriage cert (both ori)
//police cert (both ori)
//my birth cert (both copy)
//mon id (ori)
//passport 
//passport photo (20)
//form I-864 (AOS)
//naturalization cert
//DS 260
//Google Appointment letter
//Medical Examination result
//need money