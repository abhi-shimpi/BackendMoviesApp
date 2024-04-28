const express = require('express');
const router = express.Router();
const { validationResult, body } = require("express-validator");
const User = require('../model/User');
var jwt = require("jsonwebtoken");

/*For user sign-up*/
router.post('/sign-up', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors", errors);
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }
    const { name, email, password } = req.body;
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
        return res.status(404).json({ error: "Email already exists" });
    }

    const user = new User(req.body);
    user.save()
        .then(savedUser => {
            const userDetails = {
                email: savedUser.email,
                name: savedUser.name
            }
            return res.json({
                message: "Success",
                user: userDetails
            });
        })
        .catch(error => {
            return res.status(422).json({
                error: "Unable to add user",
                details: error.message
            });
        });
});

/*For user sign in*/
router.post("/sign-in", (req, res) => {
    const { email, password } = req.body;

    //finds user
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    error: "Email was not found",
                });
            }
            // Authenticate user
            if (!(user.password === req.body.password && user.email === req.body.email)) {
                return res.status(400).json({
                    error: "Email and password do not match",
                });
            }
            // Create token
            const token = jwt.sign({ email: user.email }, "secretkey");

            // Extract role payload from token.
            decoded = jwt.verify(token, "secretkey");

            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 1);

            // Put token in cookie
            res.cookie("token", token, { expire: expirationDate });

            const userObject = {
                uid : user._id,
                userName: user.name,
                email: user.email,
                token : token
            }

            res.send(userObject);
        })
        .catch(error => {
            return res.status(500).json({
                error: "Internal server error",
                details: error.message
            });
        })
});


module.exports = router;