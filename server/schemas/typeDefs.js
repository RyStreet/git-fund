const { gql } = require('apollo-server-express');

//////// FROM type Project
// image: String        
// fundingEarned: Int
// languages: String
// category: [String]
// contributors: [User]
// comments: [Comment]
// follows: Int
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        projects: [Project]
        
    }
    type Project {
        _id: ID       
        title: String
        description: String
        
        fundingGoal: Int
        creator: String
        
    }
    type Comment{
        _id: ID
        commentText: String
        commentAuthor: String
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
        users: [User]
        user(username: String!): User
        projects(username: String): [Project]
        project(projectId: ID!): Project
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addProject(title: String!, description: String!, fundingGoal: Int!): Project
        removeProject(projectId: ID!): Project
        addComment(projectId: ID!, commentText: String!): Project
        removeComment(projectId: ID!, commentId: ID!): Project
    }
`;
module.exports = typeDefs;