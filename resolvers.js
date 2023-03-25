const {tweets,users} = require('./db.js');
//const {randomBytes} = require('crypto');
const {bcrypt} = require('bcryptjs');
const { mongoose } = require('mongoose');
const {jwt} = require('jsonwebtoken');
const {JWT_SECRET} = require('./config.js');

const User = mongoose.model("User")
const resolvers = {
    Query: {
        users:()=>users,
        user:(_,{_id})=>users.find(user=>user._id == _id),
        tweets:()=>tweets,
        itweet:(_,{by})=> tweets.filter((tweet)=>tweet.by==by) 
      },
      User:{
         tweets:(usr)=> tweets.filter(tweet=>tweet.by == usr._id)
      },
      Mutation: {
        signupUser:async (_,{userNew})=>{
           const user = await User.findOne({email:userNew.email})   
           if(user){
            throw new Error("User already exists")
           }
           const hashedpass= await bcrypt.hash(userNew.password,8)
           const newUser = new User({
             ...userNew,              //since userNew is an object so to get all the values from userNew we use sprea operator ...
             password:hashedpass
           })
          return  await newUser.save()
        },
        signinUser:async (_,{userSignin})=>{
            const user = await User.findOne({email:userSignin.email})
            if(!user){
                throw new Error("User doesn't exists")
            }
            const doMatch= await bcrypt.compare(userSignin.password,user.password)
            if(!doMatch){
                throw new Error("email or password is invalid")
            }
            const token= jwt.sign({userId:user._id},JWT_SECRET)
            return {token}
        },
    }
}

module.exports={resolvers}