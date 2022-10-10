const express = require('express')
const router = express.Router()
const db = require('../config/db')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { resolve } = require('path');

var storage = multer.diskStorage({
    destination: 'images/',
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});

var upload = multer({ storage: storage });

router.post('/upload', upload.single("file"), function (req, res, file) {
    console.log(req.file, req.body);
    const post = req.body.name;
    const image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    const username = req.body.username;

    db.query(
        "INSERT INTO post (post, image, username) VALUES (?, ?, ?);", [post, image, username],
        (err, results) => {
            console.log(err);
            res.send(results);
        }
    );
});

router.get("/", (req, res) => {
    db.query(
        "SELECT * FROM socialmedia.post;",
        (err, results) => {
            console.log(err);
            res.send(results);
        }
    );
});

const rowExists = (id, user) => {
    return new Promise(resolve => {
        db.query(
            `SELECT * FROM likes WHERE postid = ${id} AND userLiking = '${user}'`, (err, results) => {
                if (err) {
                    console.log('rowExists ===', err);
                    resolve(err)
                }
                resolve(results);
            }
        );
    })
}

router.post("/like", (req, res) => {
    const userLiking = req.body.userLiking;
    const postid = req.body.postid;
    console.log('like data ===', req.body)

    rowExists(postid, userLiking).then(result => {
        console.log('row check ===', result);
        if (result.length) {
            // data exist case
            db.query(
                `DELETE FROM likes WHERE postid = ${postid} AND userLiking = '${userLiking}'`, (err, results) => {
                    if (err) {
                        console.log('delete row error ===', err);
                    }
                    console.log('row delete success ===', result);
                    db.query("UPDATE post SET likes = likes - 1 WHERE id = ?", postid, (err2, results2) => {
                        console.log('post likes row update success ===', results2);
                        res.send(results2);
                    })
                }
            );
        } else {
            // data no exist
            db.query(
                "INSERT INTO likes (userLiking, postid) VALUES(?,?)", [userLiking, postid], (err, results) => {
                    if (err) {
                        console.log('like row insert error ===', err);
                    }
                    db.query("UPDATE post SET likes = likes + 1 WHERE id = ?", postid, (err2, results2) => {
                        console.log('post likes row update success ===', results2);
                        res.send(results2);
                    })
                }
            );
        }
    })

    // db.query(
    //     "INSERT INTO likes (userLiking, postid) VALUES(?,?)", [userLiking, postid], (err, results) => {
    //         if (err) {
    //             console.log(err);
    //         }
    //         db.query("UPDATE post SET likes = likes + 1 WHERE id = ?", postid, (err2, results2) => {
    //             res.send(results);
    //         })
    //     }
    // );
})

module.exports = router;