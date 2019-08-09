const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator")
const Password = require("../../models/Password");



// @router  POST api/users
// @desc    Create / register User
// @access  Public
router.post('/', [
    check("firstname", "Please enter your first name").not().isEmpty(),
    check("lastname", "Please enter your last name").not().isEmpty(),
    check("username", "Please enter your username").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({min: 6})
    ], async (req, res) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const {firstname, lastname, username, email, password} = req.body;
        
        try {
            let user = await User.findOne({email});
            
            if(user){
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }
            const salt = await bcrypt.genSalt(12);
            const avatar = await gravatar.url(email, {s: '200', r:'pg', d:'mm'});
        
            user = new User({
                firstname, 
                lastname, 
                username, 
                email, 
                password, 
                avatar
            })
            user.password = await bcrypt.hash(password, salt);
            await user.save();
            const payload = {
                user:{ id: user.id }
            }
            jwt.sign(payload, 
                    config.get("jwtSecret"),
                    {expiresIn: 3600},
                    (error, token) => {
                        if (error) throw error;
                        res.status(200).json({token});
                        console.log("user is save to mongoose db");
                    });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }
})

// @router  GET api/user
// @desc    GET User by token
// @access  Private
router.get("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user){
            return res.status(400).json({ errors: [{ msg: 'Can not find user' }] });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
})

// @router  PUT api/users
// @desc    update User account
// @access  Private
router.put('/', [auth,
    check("firstname", "Please enter your first name").not().isEmpty(),
    check("lastname", "Please enter your last name").not().isEmpty(),
    check("username", "Please enter your username").not().isEmpty(),
], async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }

    const {firstname, lastname, username} = req.body;
   
    try {

        const userInfo = await User.findById(req.user.id);
        if (!userInfo){
            return res.status(400).json({ errors: [{ msg: 'User not found' }] });
        }
        const {email, password} = userInfo;
        const avatar = await gravatar.url(email, {s: '200', r:'pg', d:'mm'});
        
        const UpdateUser = {
            firstname, lastname, username, email, password, avatar
        }
        let user = await User.findOneAndUpdate({_id: req.user.id}, {$set:UpdateUser}, {new: true});
        
        res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
})



// @router  PUT api/users/password
// @desc    Update password
// @access  Private
router.put("/password", [auth, 
    check("password", "password is required").not().isEmpty(),
    check("oldPassword", "Old password is required").not().isEmpty()
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        let {password, oldPassword} = req.body;
        try {
            const user = await User.findById(req.user.id);
            // const {firstname, lastname, email, avatar, username} = user;
            const salt = await bcrypt.genSalt(config.get("salt"));
            
            const verify = await bcrypt.compare(oldPassword, user.password);
            
            if (!verify){
                return res.status(401).json({ errors: [{ msg: 'Incorrect old password' }] });
            }
            user.password = await bcrypt.hash(password, salt);
            user.save();
            res.status(200).json({ errors: [{ msg: 'Password updated' }] });

        } catch (error) {
            console.log(error.message);
            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }
})



// @router  PUT api/users/password/id
// @desc    Reset password by user id
// @access  Public
router.put("/password/:id", [
    check("password", "password is required").not().isEmpty(),
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        let {password} = req.body;
        let _id = req.params.id;
        try {
            const user = await User.findById(_id);            
            if (!user){
                return res.status(401).json({ errors: [{ msg: 'User not found' }] }); 
            }
            const salt = await bcrypt.genSalt(config.get("salt"));
            user.password = await bcrypt.hash(password, salt);
            user.save();

            const reset = await Password.findOneAndRemove({user: _id});
            await reset.save();

            res.status(200).json({ errors: [{ msg: 'Password reset' }] });

        } catch (error) {
            console.log(error.message);
            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }
})

// @router  DELETE api/users/password
// @desc    Delete user by token
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.user.id);
        res.status(200).json({ errors: [{ msg: 'User deleted' }] });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
})











module.exports = router;