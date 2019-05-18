const express = require("express");
const users = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//get model
const User = require("../models/User");
process.env.SECRET_KEY = "secret"

//Regiter
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

users.get('/dashboard', verifyToken, (req, res) => {
    
    console.log('dashboard', req.secretKey);
    console.log('dashboard', req);
    
    jwt.verify(req.token, 'loginIsMyPrivateKey', (err, authData) => {
        if(err){
            console.log('outside');
            return res.status(400).json({
                "data": 'token expired'
            });
        } else {
            console.log('inside');
            return res.status(200).json({ 
                "data": 'welcome on your dashboard',
                authData
            });
        }
    })
})
//LOGIN
users.post('/login', (req, res, next) => {
    let secretKey = "loginIsMyPrivateKey";    
    User.findOne({email: req.body.email}, function (err, userInfo) {
        // is input empty
        if(req.body.email.length === 0 && req.body.password.length === 0){
            res.header("Content-Type", "application/json; charset=UTF-8");
            return res.status(400).send({data: "email and password can not be empty"});
        }
        // is password empty
        if(req.body.password.length === 0){
            res.header("Content-Type", "application/json; charset=UTF-8")
            return res.status(400).send({data: "password can not be empty"});
        }
        // is email incorrect null  
        if (!userInfo) {
            res.header("Content-Type", "application/json; charset=UTF-8")
            return res.status(400).send({data: "email is incorrect or empty"});
        }
        if(err){
            next(err)
        }        
        else {
            if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                // create jwt token
                jwt.sign({ id: userInfo._id, email: userInfo.email }, secretKey, {expiresIn: '1h'}, (err, token) => {
                    res.header("Content-Type", "application/json; charset=UTF-8");
                    return res.status(200).json(
                        {
                            success: true,
                            data: "authentication successful",
                            secretKey,
                            token
                        }
                    );
                });
            }else{
                res.header("Content-Type", "application/json; charset=UTF-8")
                return res.status(400).send({data: "password do not match with email given"});
            }
        }
    })
});


function verifyToken(req, res, next) {
    //Get auth header value
    console.log(req.headers);
    const bearerHeader = req.headers.authorization;
    // check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // set the token
        req.token = bearerToken;
        //next middleare
        next();

    } else {
        //Auth Error
        return res.status(401).json({data: "you must login"})
    }
}

module.exports = users;