const express = require('express')
const router = express.Router()
const db = require('../config/db')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, '../images')
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, Date.now() + path.extname(file.originalname))
  }

});
const upload = multer({storage: storage});

router.post("/post", upload.single('image'), (req, res) => {

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