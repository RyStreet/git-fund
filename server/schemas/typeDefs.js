const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        userProjects: [Project]
        followedProjects: [Project]
    }
    Project {
        _id: ID!
        title: String!
        description: String!
        fundingGoal: Int!
        fundingEarned: Int!
        languages: String!
        category: [string]
        creator: User
        contributors: [User]
        comments: [Comment]
        follows: INT!
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
    }
    `;
    module.exports = typeDefs;