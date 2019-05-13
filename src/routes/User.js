const express = require("express");
const users = express.Router();
const bcrypt = require("bcrypt");

//get model
const User = require("../models/User");
process.env.SECRET_KEY = "secret"

//register user api
users.post('/register', (req, res) => {
    message = {};
    const userData = {
        fullName: req.body.fullName,
        contact: req.body.contact,
        email: (req.body.email).toLowerCase(),
        password: req.body.password
    }
    //VALIDATE
    const validate = async(message, userData) => {
        // Email
        const isValid = (email) => {
            const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
            return expression.test(String(email).toLowerCase());
        }
        if (!isValid(userData.email)) {
            message["data"] = "email should be valid";
            res.header({"Content-Type": "application/json"});
            return Promise.reject(message);
        }
        //password
        if (userData.password !== req.body.confirmPassword || userData.password.length < 5){
            message["data"] = "password should match with minimum of 5 length";
            res.header({"Content-Type": "application/json"});
            return Promise.reject(message);
        }
        //checkbox
        if (!req.body.checkbox){
            message["data"] = "you must agree to our privacy policy";
            res.header({"Content-Type": "application/json"});
            return Promise.reject(message);
        }
        //hash pwd
        let hash = userData.password
        let hashPwd = bcrypt.hashSync(hash, 10);
        userData.password = hashPwd;
        
        return userData;
    }
    validate(message, userData)
        .then(input => {
            //save user in db
            User.create(userData, (err) => {
                if (err) {
                    message["data"] = err.toJSON().message
                    res.header({"Content-Type": "application/json"});       
                    res.status(400).send(message);
                } else {
                    message["data"] =  "user successfuly registered!!";
                    res.header({"Content-Type": "application/json"});
                    res.status(200).send(message);
                }
            })
        })
        .catch(err => res.status(400).send(err))
})

users.get('/test', (request, response) => {
    response.header({"Content-Type": "application/json"});
    response.status(200).send({"data": 'works'});
})
module.exports = users;
