const express = require('express')
const router = express.Router()
const db = require('../config/db')

router.post("/post", (req, res) => {

    const post = req.body.post;
    const image = req.body.image;
    const username = req.body.username;

    db.query(
        "INSERT INTO post (post, image, username) VALUES (?, ?, ?);", [post, image, username],
        (err, results) => {
        console.log(err);
        res.send(results);
    }
    );
});

router.get("/feed", (req, res) => {
    db.query(
        "SELECT * FROM socialmedia.post;",
        (err, results) => {
        console.log(err);
        res.send(results);
    }
    );
});

module.exports = router;