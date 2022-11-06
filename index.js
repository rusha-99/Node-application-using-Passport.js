const express = require('express');
const passport = require('passport');
const connection = require('./connection');
const User = require('./models/user_model');
const app = express();
const flash = require('express-flash');
const session = require('express-session');
const methodeOverride = require('method-override');
const passport_config = require('./passport-config');




connection();
app.use(flash());
app.use(methodeOverride('_method'));
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:false
}));


app.use(express.urlencoded({extended:false}));
app.use(passport.initialize());
app.use(passport.session());


app.set('view-engine', 'ejs');

app.get('/',(req,res)=>res.render('home.ejs',{user:req.user}));
app.get('/login',isguest,(req,res)=>res.render('login.ejs'));
app.get('/register',isguest,(req,res)=>res.render('register.ejs'));
app.get('/profile',loggedIn ,(req,res)=>res.render('profile.ejs',{user:req.user}));


app.post('/register',isguest,(req,res) =>{
    var user = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password 
    });

    user.save().then(()=>{
        console.log('user saved in DB');
        res.redirect('login');
    })
})


app.post('/login',isguest, passport.authenticate('local',{
    successRedirect:'/profile',
    failureRedirect:'/login',
    failureFlash:true
}));

/*app.delete('/logout',(req,res) => {
    req.logOut();
    res.redirect('/login');
})*/

app.delete('/logout',(req, res)=>{
    req.logOut(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('/login');
    });
  });








function loggedIn(req,res,next){
    if(req.user){
        next();
    }else{
        res.redirect('/login');
    }
}

function isguest(req,res,next){
    if(req.user){
        res.redirect('/profile');
    }else{
        next();
    }
}

app.listen(3000);
