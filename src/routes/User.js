const express = require("express");
const users = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//get model
const User = require("../models/User");
process.env.SECRET_KEY = "secret"


//register user api
users.post('/register', (req, res) => {
    const userData = {
        fullnName: req.body.fullName,
        contact: req.body.contact,
        email: req.body.email,
        password: req.body.password
    }
    User.create(userData, (err, pass) => {
        if (err) {
            let message = {
                data: err.toJSON().message
            }
            res.status(400).send(message);
        } else {
            let message = {
                data: "user successfuly registered!!"
            }
            res.status(200).send(message);
        }
    })
})

module.exports = users;