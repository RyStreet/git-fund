const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        projects: [Project]
        collabProjects: [Project]
        bio: String
        linkedin: String
        github: String
        comments: [Comment]
        
    }
    type Project {
        _id: ID       
        title: String
        description: String
        fundingGoal: Int
        fundingEarned: [Donation]
        creator: String
        repo: String
        collaborators: [Collaborator]!
        comments: [Comment]!
        
    }
    type Donation{
        _id: ID
        amount: Int
        donaterName: String
    }
    type Collaborator {
        _id: ID
        collabNotes: String
        collaboratorInfo: User
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
        editProfile(userId: ID!, bio: String, linkedin: String, github: String): User

        addProject(title: String!, description: String!, fundingGoal: Int!, repo: String!): Project
        removeProject(projectId: ID!): Project
        editProject(projectId: ID!, title: String!, description: String!, fundingGoal: Int!, repo: String!): Project

        addDonation(projectId: ID!, amount: Int!): Project
        addCollaborator(projectId: ID!, collabNotes: String!): Project

        

        addComment(projectId: ID!, commentText: String!): Project
        removeComment(projectId: ID!, commentId: ID!): Project
      
    }
`;

// removeComment(projectId: ID!, commentId: ID!): Project 
// editComment(projectId: ID!, commentId: ID!, commentText: String!): Project 


// userComments(username: String):[Comment]     <-query
module.exports = typeDefs;