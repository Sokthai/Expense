const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");
const auth = require("../../middleware/auth");
const {check , validationResult} = require("express-validator");

// @router  POST api/item
// @desc    Create item only (because item is an array)
// @access  Private
router.post("/", [auth,
    check("paidBy", "Paid by is required").not().isEmpty(),
    check("item", "Paid by is required").not().isEmpty(),
    check("category", "category is required").not().isEmpty(),
    check("price", "Price is required").not().isEmpty()
    ], async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {paidBy, item, category, price, location, media, description, purchaseDate} = req.body;
        const itemField = {paidBy, item, category, price, location, media, description, purchaseDate};
    
    try {
        let items = await Item.findOne({user: req.user.id});
        
        if (!items){
            items = new Item();
            items.user = req.user.id
        }
        items.spending.unshift(itemField);
        await items.save();
        res.status(200).json(items.spending);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: [{ msg: 'SERVER ERROR' }] });
    }
})

// @router  POST api/item/:id
// @desc    Update item
// @access  Private
router.put("/:id", [auth,
    check("paidBy", "Paid by is required").not().isEmpty(),
    check("item", "Paid by is required").not().isEmpty(),
    check("category", "category is required").not().isEmpty(),
    check("price", "Price is required").not().isEmpty(),
    ], async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const {paidBy, item, category, price, location, media, description, purchaseDate} = req.body;
        const itemField = {paidBy, item, category, price, location, media, description, purchaseDate};
        const _id = req.params.id;
    try {
        const items = await Item.findOne({user: req.user.id});
        const updateIndex = items.spending.map(item => item._id).indexOf(_id);
        items.spending[updateIndex] = itemField;
        await items.save();
        res.status(200).json(items.spending);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: [{ msg: 'SERVER ERROR' }] });
    }
})


// @router  GET api/item/:id
// @desc    Get an item
// @access  Private
router.get("/:id", auth, async(req, res) =>{
    try {
        const _id = req.params.id;
        const items = await Item.findOne({user: req.user.id}).populate("user", ["username", "avatar"]);
        const itemIndex = items.spending.map(item => item._id).indexOf(_id);
        res.status(200).json(items.spending[itemIndex]);
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server Error");
    }
})

// @router  GET api/item/
// @desc    Get all items from current user
// @access  Private
router.get("/", auth, async(req, res)=>{
    try {
        const items = await Item.findOne({user: req.user.id}).populate("user", ["username", "avatar"]);
        if (!items || items === null){
            return res.status(400).json({ errors: [{ msg: 'No Item found' }] })
        }
        res.status(200).json(items.spending);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: [{ msg: 'SERVER ERROR' }] });
    }
})

// @router DELETE api/item/:id
// @desc Delete an item
// @access private
router.delete("/:id", auth, async(req, res) => {
    try {
        const items = await Item.findOne({user: req.user.id});
        const _id = req.params.id;
        const deleteIndex = items.spending.map(item => item._id).indexOf(_id);
        items.spending.splice(deleteIndex, 1);
        items.save();
        res.status(200).json(items.spending);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: [{ msg: 'SERVER ERROR' }] });
    }
})


// @router DELETE api/item/
// @desc Delete all current user item
// @access private
router.delete("/", auth, async(req, res) => {
    try {
        await Item.findOneAndRemove({user: req.user.id});
        res.status(200).json({ errors: [{ msg: 'All Items are deleted' }] });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: [{ msg: 'SERVER ERROR' }] });
    }
})




module.exports = router;