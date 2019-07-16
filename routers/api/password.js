const express = require("express")
const route = express.Router();
const Password = require("../../models/Password");




// @router  get api/password/:id
// @desc    Validate the reset link
// @access  Public
route.get('/:id', async (req, res) =>{
    const _id = req.params.id;
    try {
        const pass = await Password.findOne({user: _id});
        if (!pass || !pass.valid){
            return res.status(401).json({errors : [{msg: 'The link is expred'}]})
        }
        res.status(200).json(pass);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
})


module.exports = route;
