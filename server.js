const {ApolloServer} = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const {typeDefs} = require('./schemaGQL.js');
const {mongoose} = require('mongoose');
const { MONGO_URL } = require('./config.js');

mongoose.connect(MONGO_URL,{
    useNewUrlParser:true,
    userUnifiedTopology:true
})

mongoose.connection.on("connected",()=>{
    console.log("connected to mongodb")
})

mongoose.connection.on("error",(err)=>{
    console.log("error connecting",err)
})

require('./models/User.js')
require('./models/Tweets.js')
const {resolvers} = require('./resolvers.js');

const server = new ApolloServer({

    typeDefs,
    resolvers,
    plugins:[
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
  
  });

server.listen().then(({url})=>{
    console.log(`🚀  Server ready at: ${url}`);
});