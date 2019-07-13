const express = require("express");
const route = express.Router();
const nodemailer = require("nodemailer");
const config = require("config");
const Password = require("../../models/Password");
const User = require("../../models/User");
const {check, validationResult} = require("express-validator");



// @router  POST api/email/forgetpassword
// @desc    Reset password
// @access  Public
route.post("/forgetpassword", [
    check("email", "Email is required").not().isEmpty()
    ],async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email} = req.body;
    

    try {
       console.log(email);
        let user = await User.findOne({email}).select("-password");
        if (!user){//if email is not exist in the database
            return res.status(400).json({errors: [{ msg: 'Email is not exist' }] })
        }

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: 'sokthaitang@gmail.com',
            pass: config.get("google2stepPassword")// this is google 2stepfactore password, follow all instruction. when select app, choose "other/Custom name" and type "http://localhsot:1000" because we work on localhost and click generate
            }
        });

        let link = `http://localhost:3000/resetpassword/${user._id}`;
        
        let mailOptions = {
            from: 'sokthaitang@gmail.com',
            to: email,
            subject: '<PP Expense> Reset password',
            text: 'Reset your password',
            html: `<p>Please click the link below to reset password</p><br/><p>${link}</p>`
        };
     

        await transporter.sendMail(mailOptions);

        let expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 1);

        const reset = new Password({
            user: user._id,
            expireDate: expireDate,
            valid: true
        });
        await reset.save();
        res.status(200).json({ errors: [{ msg: `Please check your email to reset password` }] })
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
      }
      
   

})


module.exports = route;



