const passport = require('passport')
const {User} = require('./db')
const localStratagy = require('passport-local').Strategy


exports.initilizePassport =()=>{

    passport.use(new localStratagy(async(username,password,done)=>{
       try{
        const user = await User.findOne({username})
        if(!user) return done(null,false)

        if(password!=user.password) return done(null,false)

        return done(null,user)
       }catch(e){
        return done(e,false)
       }
    }))

    passport.serializeUser((user,done)=>{
        done(null,user.id)
    })
    passport.deserializeUser((async(id,done)=>{
        try{
            const user = await User.findById(id)
            done(null,user)
        }catch(e){
            done(e,false)
        }
    }))
}


exports.isAuthenticate = (req,res,next) =>{
    if(req.user) return next()
    res.redirect('/login')

}
