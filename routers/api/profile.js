const express = require("express");
const router = express.Router();
const {check, validationResult } = require("express-validator");
const config = require("config");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");



// @router  POST api/profile
// @desc    Create / Update profile (since it is not an array)
// @access  Private
router.post('/', [auth,
        // check("phone", "phone is required").not().isEmpty(),
        check("gender", "gender is required").not().isEmpty(),
        check("street", "street is required").not().isEmpty(),
        check("city", "city is required").not().isEmpty(),
        check("state", "state/province is required").not().isEmpty(),
        // check("zipcode", "zipcode is required").not().isEmpty(),
        check("country", "country is required").not().isEmpty(),
        check('question1', 'Question1 is required').not().isEmpty(),
        check('question2', 'Question2 is required').not().isEmpty(),
        check('question3', 'Question3 is required').not().isEmpty(),
        check('answer1', 'Answer1 is required').not().isEmpty(),
        check('answer2', 'Answer2 is required').not().isEmpty(),
        check('answer3', 'Answer3 is required').not().isEmpty()
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(422).json({errors: errors.array()});
        }
        const {phone, gender, street, city, state, country, zipcode, question1, question2, question3, answer1, answer2, answer3} = req.body;
        

            const profileField = {}
            profileField.user = req.user.id;
            if (phone) profileField.phone = phone;
            if (gender) profileField.gender = gender;
            if (city) profileField.city = city;
            if (street) profileField.street = street;
            if (state) profileField.state = state;
            if (country) profileField.country = country;
            if (zipcode) profileField.zipcode = zipcode;

            profileField.question = {};
            profileField.answer = {};
            
            if (question1) profileField.question.question1 = question1;
            if (question2) profileField.question.question2 = question2;
            if (question3) profileField.question.question3 = question3;
            if (answer1) profileField.answer.answer1 = answer1;
            if (answer2) profileField.answer.answer2 = answer2;
            if (answer3) profileField.answer.answer3 = answer3;

            console.log(profileField);
            
        try {
            let profile = await Profile.findOne({user:req.user.id});
            if (profile){ //if found, update it
                profile = await Profile.findOneAndUpdate({user: req.user.id}, {$set : profileField}, {new: true});
                console.log("profile is udpated");
                return res.status(200).json(profile);
            }
            //not found, create profile
            profile = new Profile(profileField);
            console.log("profile is created");
            await profile.save();
            res.status(200).json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }
})

// @router  GET api/profile/user
// @desc    get current profile by token
// @access  Private
router.get("/user", auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate("user", ["username", "firstname", "lastname", "email", "avatar"]);
        if (!profile){
            return res.status(400).json({ errors: [{ msg: 'Profile not found' }] });
        }
        res.status(200).json(profile)

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
})

// @router  GET api/profile
// @desc    get all profile
// @access  Private
router.get("/", auth, async(req, res) => {
    try {
        const profiles = await Profile.find().populate("user", ["username", "firstname", "lastname","email", "avatar"]);
        if (!profiles || profiles === null){
            return res.status(400).json({ errors: [{ msg: 'Profile not found' }] });
        }
        res.status(200).json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
})


// @router  GET api/profile/reset/:id
// @desc    get a profile by user id
// @access  Public
router.get("/reset/:id", async(req, res) => {
    try {
        const _id = req.params.id;
        const profile = await Profile.findOne({user: _id}).populate("user", ["username", "firstname", "lastname","email", "avatar"]);
        if (!profile){
            return res.status(400).json({ errors: [{ msg: 'Profile not found' }] });
        }
        console.log('from backend');
        res.status(200).json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
})


// @router  DELETE api/profile
// @desc    Delete current profile
// @access  Private
router.delete("/", auth, async(req, res) => {
    try {
        await Profile.findOneAndRemove({user: req.user.id});
        await User.findByIdAndRemove(req.user.id);
        res.status(200).json({ errors: [{ msg: 'profile is removed' }] });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
})




// @router  DELETE api/profile/:id
// @desc    Delete all profile
// @access  Private
router.delete("/all", auth, async(req, res) => {
    
    try {
        const _id = req.params.id;//user id not profild id
        await Profile.remove();
        await User.remove();
        res.status(200).json("all profile is removed");
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
})


// @router  DELETE api/profile/:id
// @desc    Delete a profile
// @access  Private
router.delete("/:id", auth, async(req, res) => {
    
    try {
        const _id = req.params.id;//user id not profild id
        await Profile.findOneAndRemove({user: _id});
        await User.findByIdAndRemove({_id});
        res.status(200).json({ errors: [{ msg: 'profile is removed' }] });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
})














module.exports = router;