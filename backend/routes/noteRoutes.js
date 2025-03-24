const express=require('express')
const router=express.Router()
// const notesController=require('../controllers/notesController')
const {getAllNotes,createNewNote,updateNote,deleteNote} = require('../controllers/notesController')
const verifyJWT=require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    // .get(notesController.getAllNotes)
    .get(getAllNotes)
    // .post(notesController.createNewNote)
    .post(createNewNote)
    // .patch(notesController.updateNote)
    .patch(updateNote)
    // .delete(notesController.deleteNote)
    .delete(deleteNote)

module.exports=router