const  express = require('express')
const app = express()
const {mongooseConnect,User} = require('./db')
const port = 3000
const passport = require('passport')
const localPassport = require('passport-local')
const expressSession = require('express-session')
const {initilizePassport,isAuthenticate} = require('./passportConfig')
mongooseConnect();


initilizePassport(passport);

//middlewares
app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(expressSession({
  secret:"Secret",
  resave:false,
  saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())


 



//Post Routes
app.post('/register',async (req,res)=>{
  const user = await User.findOne({username:req.body.username})
  if(user) return res.status(400).send("User Already Exists")
  const newUser = await User.create(req.body);
  return res.status(200).send(newUser)
  
})

app.post('/login',passport.authenticate("local",{
  failureRedirect:'/login',
  successRedirect:'/profile'
}))



//Get Routes
app.get('/', (req, res) =>{
  res.render('index')
})

app.get('/login', (req, res) =>{
  res.render('login')
})

app.get('/register', (req, res) =>{
  res.render('register')
})

app.get('/profile', isAuthenticate,(req, res) =>{
  res.render("profile",{user:req.user})
})

app.get('/logout', (req, res) => {
  req.logOut(err => {
      if (err) {
          return next(err);
      }
      res.redirect('/login');
  });
});







app.listen(port, () => console.log(`Example app listening on port ${port}!`))