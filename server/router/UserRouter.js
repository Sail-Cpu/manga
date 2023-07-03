const express = require("express");
const router = express.Router();
const pool = require("../db");


router.get(`/users`, (req, res) => {
    try {
        let query = 'select * from sera.public.users';
        pool.query(query, (error, result) => {
            if (error) throw error;
            res.send({data: result.rows});
        })
    } catch (error) {
        console.log(error);
    }
})

router.get(`/users/:userID`, (req, res) => {
    try {
        let {userID} = req.params
        let query = 'select * from sera.public.users where id=$1';
        pool.query(query, [userID], (error, result) => {
            if (error) throw error;
            res.send({data: result.rows});
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;