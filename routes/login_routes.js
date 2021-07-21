const express = require('express');
const router = express.Router();

// route to login
router.get('/', (req, res) =>{
    res.render('login', {
        title: "login"
    })
})
router.post('/', (req, res) =>{
    res.redirect('/')
})

module.exports = router;