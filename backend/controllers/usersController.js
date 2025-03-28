const User=require('../models/User')
const Note=require('../models/Note')
// const asyncHandler=require('express-async-handler')
const bcrypt=require('bcrypt')

// @desc Get all users
// @route GET /users
// @access Private
// const getAllUsers=asyncHandler(async(req,res) => {
const getAllUsers=async(req,res) => {
    const users=await User.find().select('-password').lean()
    if(!users?.length)
        return res.status(400).json({message: 'No users found'})
    res.json(users)
// })
}

// @desc Create new user
// @route POST /users
// @access Private
// const createNewUser=asyncHandler(async(req,res) => {
const createNewUser=async(req,res) => {
    const {username,password,roles} = req.body
    
    // Confirm data
    if(!username || !password)
        return res.status(400).json({message: 'All Fields are required'})
    
    // Check for duplicate
    // const duplicate=await User.findOne({username}).lean().exec()
    const duplicate=await User.findOne({username}).collation({locale: 'en', strength: 2}).lean().exec()
    if(duplicate)
        return res.status(409).json({message: 'Duplicate username'})
    
    // Hash password
    const hashedPwd=await bcrypt.hash(password,10)  // salt rounds
    
    // const userObject={username, password: hashedPwd, roles}
    const userObject=(!Array.isArray(roles) || !roles.length)
                     ? {username, "password": hashedPwd}
                     : {username, "password": hashedPwd, roles}
    
    // Create and store new user
    const user=await User.create(userObject)
    if(user)    //created
        return res.status(201).json({message: `New user ${username} created`})
    else
        return res.status(400).json({message: 'Invalid user data received'})
// })
}

// @desc Update a user
// @route PATCH /users
// @access Private
// const updateUser=asyncHandler(async(req,res) => {
const updateUser=async(req,res) => {
    const {id,username,roles,active,password} = req.body
    
    // Confirm data
    if(!id || !username || !Array.isArray(roles) || !roles.length || typeof active!=='boolean')
        return res.status(400).json({message: 'All fields are required'})
    
    const user=await User.findById(id).exec()
    if(!user)
        return res.status(400).json({message: `User not found`})
    
    // Check for duplicate
    // const duplicate=await User.findOne({username}).lean().exec()
    const duplicate=await User.findOne({username}).collation({locale: 'en', strength: 2}).lean().exec()
    // Allow updates to the original user
    if(duplicate && duplicate._id.toString()!==id)
        return res.status(409).json({message: 'Duplicate username'})
    
    user.username=username
    user.roles=roles
    user.active=active
    if(password) {
        // Hash Password
        user.password=await bcrypt.hash(password,10)  // salt rounds
    }
    const updateUser=await user.save()
    res.json({message: `${updateUser.username} updated`})
// })
}

// @desc Delete a user
// @route DELETE /users
// @access Private
// const deleteUser=asyncHandler(async(req,res) => {
const deleteUser=async(req,res) => {
    const {id}=req.body
    
    // Confirm id
    if(!id)
        return res.status(400).json({message: 'UserId required'})
    
    // Notes for that user
    const note=await Note.findOne({user: id}).lean().exec()
    if(note?.length)
        return res.status(400).json({message: 'User has assigned notes'})
    
    const user=await User.findById(id).exec()
    if(!user)
        return res.status(400).json({message: 'User not found'})
    const result=await user.deleteOne()
    // const reply=`Username ${result.username} with ID ${result._id} deleted`
    const reply=`Username ${user.username} with ID ${user._id} deleted`
    res.json(reply)
// })
}

module.exports={getAllUsers,createNewUser,updateUser,deleteUser}