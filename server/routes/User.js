const express = require('express')
const router = express.Router()
const db = require('../config/db')

router.post("/register", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "INSERT INTO users (username, password) VALUES (?, ?);", [username, password],
        (err, results) => {
        console.log(err);
        res.send(results);
    }
    );
});

router.post("/login", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ?", 
        username,
        (err, results) => {
            if (err) {
                console.log(err)
            }
            if (results) {
                if (password == results[0].password) {
                    console.log("You are logged in!");
                } else {
                    res.send("Wrong username, password combination");
                }
            } else {
                res.send("This user does not exist");
            }

        res.send(results);
    }
    );
});

module.exports = router;
