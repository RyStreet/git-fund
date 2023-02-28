const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        projects: [Project]
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