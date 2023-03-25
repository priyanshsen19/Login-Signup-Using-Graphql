const {mongoose} = require('mongoose');
const tweetSchema = new mongoose.Schema({
    text:{
        type: String,
        required:true
    },
    by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

mongoose.model("Tweet",tweetSchema)