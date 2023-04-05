const {tweets,users} = require('./db.js');
//const {randomBytes} = require('crypto');
const {hash,compare} = require('bcrypt');
//const {bcrypt} = require('bcryptjs');
const { mongoose } = require('mongoose');
const {sign} = require('jsonwebtoken');
const {JWT_SECRET} = require('./config.js');
const User = mongoose.model("User")
const Tweet = mongoose.model("Tweet")

const resolvers = {
    Query: {
      users:async () => await User.find({}),
      user:async (_,{_id})=> await User.findOne({_id}),
      tweets:async ()=>await Tweet.find({}),
      itweet:async (_,{by})=> await Tweet.find({by})
   },
   User:{
       tweets:async (ur)=> await Tweet.find({by:ur._id})
      },
      Mutation: {
        signupUser:async (_,{userNew})=>{
           const user = await User.findOne({email:userNew.email})   
           if(user){
            throw new Error("User already exists")
           }
           const hashedpass= await hash(userNew.password,8)
           const newUser = new User({
             ...userNew,              //since userNew is an object so to get all the values from userNew we use spread operator ...
             password:hashedpass
           })
          return  await newUser.save()
        },
        signinUser:async (_,{userSignin})=>{
            const user = await User.findOne({email:userSignin.email})
            if(!user){
                throw new Error("User doesn't exists")
            }
            const doMatch= await compare(userSignin.password,user.password)
            if(!doMatch){
                throw new Error("email or password is invalid")
            }
            const token= sign({userId:user._id},JWT_SECRET)
            return {token}
        },
        createTweet: async (_,{text},{userId})=>{
            if(!userId) throw new Error("you must be logged in");
            const newTweet= new Tweet({
              text,
              by:userId
            })
            await newTweet.save()
            return "Tweet saved successfully"
        }
    }
}

module.exports={resolvers}