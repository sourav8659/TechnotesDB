const express=require('express')
const router=express.Router()
// const authController=require('../controllers/authController')
const {login,refresh,logout}=require('../controllers/authController')
const loginLimiter=require('../middleware/loginLimiter')

router.route('/')
    // .post(loginLimiter,authController.login)
    .post(loginLimiter,login)
    
router.route('/refresh')
    // .get(authController.refresh)
    .get(refresh)

router.route('/logout')
    // .post(authController.logout)
    .post(logout)


module.exports=router