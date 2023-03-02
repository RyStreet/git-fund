const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        userProjects: [Project]
        followedProjects: [Project]
        bio: String!
    }
    type Project {
        projectID: ID!
        title: String!
        description: String!
        image: String!
        fundingGoal: Int!
        fundingEarned: Int!
        languages: String!
        category: [String]
        creator: User
        contributors: [User]
        comments: [Comment]
        follows: Int!
    }
    type Comment{
        commentID: ID!
        commentText: String!
        author: User!
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        removeProject(projectId: ID!): User
        addProject(name: String!, description: String!, creator: String!, fundingGoal: Int!): Project
        
    }
    `;
    module.exports = typeDefs;