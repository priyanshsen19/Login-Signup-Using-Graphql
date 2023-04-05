const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const {mongoose} = require('mongoose');
const {typeDefs} = require('./schemaGQL.js');
const {MONGO_URI, JWT_SECRET} = require('./config.js');
const {jwt,verify} = require('jsonwebtoken');

mongoose.connect(MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
    console.log("connected to mongodb")
})

mongoose.connection.on("error",(err)=>{
    console.log("error connecting",err)
})

require('./models/User.js');
require('./models/Tweets.js');
const { resolvers } = require('./resolvers.js');

const context = ({req})=>{
    const { authorization } = req.headers;
    if(authorization){
     const {userId} = verify(authorization,JWT_SECRET)
     return {userId}
    }
}
    
const server = new ApolloServer({

    typeDefs,
    resolvers,
    context,
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
  
  });

server.listen().then(({url})=>{
    console.log(`🚀  Server ready at: ${url}`);
});