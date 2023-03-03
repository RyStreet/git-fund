const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        userProjects: [Project]
        followedProjects: [Project]
        bio: String
    }
    type Project {
        _id: ID!
        projectID: ID
        title: String
        description: String
        image: String
        fundingGoal: Int
        fundingEarned: Int
        languages: String
        category: [String]
        contributors: [User]
        comments: [Comment]
        follows: Int
    }
    type Comment{
        commentID: ID!
        commentText: String!
        commentAuthor: User!
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
        projects: [Project]
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        removeProject(projectID: ID!): User
        addProject(title: String!, description: String!, fundingGoal: Int!, userID: ID!): Project
        
    }
    `;
    module.exports = typeDefs;