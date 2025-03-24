const express=require('express')
const router=express.Router()
// const usersController=require('../controllers/usersController')
const {getAllUsers,createNewUser,updateUser,deleteUser} = require('../controllers/usersController')
const verifyJWT=require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    // .get(usersController.getAllUsers)
    .get(getAllUsers)
    // .post(usersController.createNewUser)
    .post(createNewUser)
    // .patch(usersController.updateUser)
    .patch(updateUser)
    // .delete(usersController.deleteUser)
    .delete(deleteUser)

module.exports=router