const express = require('express');
const router = express.Router();
const {register, login, details} = require('../controllers/users');

router.get('/login', (req, res) => {
    res.render('login', {title:"Login"});
})
router.get('/register', (req, res) => {
    res.render('register', {title:"Register"});
})

router.post('/register-data', register);
router.post('/login-data', login);
router.get('/details', details);

module.exports = router;