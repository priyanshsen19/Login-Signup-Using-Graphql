
const gql = require('graphql-tag');

const typeDefs = gql`
type Query{
    users:[User]
    user(_id:ID!):User
    tweets:[Tweet]
    itweet(by:ID!):[Tweet]
  } 
type User {
    _id:ID!
    firstName:String
    lastName:String
    email:String
    password:String
    tweets:[Tweet]
}
type Tweet{
    text:String
    by:ID
}

type Token{
    token:String
}

type Mutation{
    signupUser(userNew:UserInput!):User
    signinUser(userSign:UserSigninInput!):Token
}
input UserInput{
    firstName:String!,
    lastName:String!,
    email:String!,
    password:String!
}
input UserSigninInput{
    email:String!
    password:String!
}
`;

module.exports={typeDefs}