const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next)=>{
  res.render('index', { user: req.user });
});

router.get('/register',(req,res)=>{
  res.render('register', {});
})

router.post('/register',(req,res)=>{
  console.log("req.body.username",req.body.username)
  console.log("req.body.password",req.body.password)
  Account.register(new Account({ username : req.body.username }), req.body.password, (err, account)=> {
    if (err) { return res.render('register', { account : account }); }

    passport.authenticate('local')(req, res, ()=>{
      res.redirect('/');
    });
  });

});

router.get('/login', (req, res)=> {
  res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), (req, res)=> {
  res.redirect('/');
});

router.get('/logout', (req, res)=> {
  req.logout();
  res.redirect('/');
});

router.get('/ping', (req, res)=>{
  res.status(200).send("pong!");
});

module.exports = router;
