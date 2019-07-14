const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const {check, validationResult} = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");






// @router  POST api/login
// @desc    Login User
// @access  Public
router.post('/',[
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()});
    }


    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user){
            return res.status(400).json({ errors: [{ msg: 'No User found' }] });
        }

        const verify = await bcrypt.compare(password, user.password);
        if (!verify){
            return res.status(401).json({ errors: [{ msg: 'Incorrest email or password' }] });
        }
    
        const payload= {
            user:{id : user.id}
        }

        jwt.sign(payload, 
            config.get("jwtSecret"), 
            {expiresIn: 3600},
            (error, token) => {
                if (error) throw error;
                res.status(200).json({token});
                console.log("User is logged in successfully");
            })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
});



module.exports = router;