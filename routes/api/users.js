// login and register
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/User');

// get /api/users/test
// @desc json数据
// @access public
router.get('/test', (req, res) => {
    res.json({msg: 'login works'});
})

// post /api/users/register
// @desc json数据
// @access public
router.post('/register', (req, res) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user) {
                res.status(400).json({msg: '用户名已被注册'});
            } else {
                const newUser = User({
                    username: req.body.username,
                    password: req.body.password,
                });

                newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            }
        })
})

// post /api/users/login
// @desc json数据
// @access public
router.post('/login', (req, res) => {
    const username =  req.body.username;
    const password =  req.body.password;
    User.findOne({ username })
        .then((user) => {
            if (!user) {
                res.status(400).json({msg: '用户名错误'});
            } else {
                if(password == user.password) {
                    const rule = {id: user.id, username: user.username}
                    jwt.sign(rule, 'secret', {expiresIn: 3000}, (err, token) => {
                        res.json({
                            id: user.id,
                            username: user.username,
                            msg: 'success',
                            token: 'Bearer ' + token,
                        })
                    })
                } else {
                    res.status(400).json({msg: '密码错误'});
                }
            }
        })
})

// 验证token
// post /api/users/current
// @desc json数据
// @access private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username
    });
})

module.exports = router;