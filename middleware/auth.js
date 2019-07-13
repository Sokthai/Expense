const express = require("express");
const jwt = require("jsonwebtoken");
const config = require("config");

const auth = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token){
        console.log("no Token, permission deny");
        return res.status(400).json({ errors: [{ msg: 'No Token, Permisson deny' }] });
    }
    try {
        const decode = jwt.verify(token, config.get("jwtSecret"));
        req.user = decode.user;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ errors: [{ msg: 'Token not valid' }] });
    }
}


module.exports = auth;