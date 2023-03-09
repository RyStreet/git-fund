import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String! $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject($title: String!, $description: String!, $fundingGoal: Int!, $repo: String!) {
    addProject(title: $title, description: $description, fundingGoal: $fundingGoal, repo: $repo) {
      _id
      title
      description
      fundingGoal
      creator
      repo
      collaborators {
        _id
        collabNotes
      }
    }
  }
`;

export const ADD_COLLABORATOR = gql`
  mutation addCollaborator($projectId: ID!, $collabNotes: String!) {
    addCollaborator(projectId: $projectId, collabNotes: $collabNotes) {
      _id
      title
      description
      fundingGoal
      creator
      repo
      
      collaborators {
        _id
        collabNotes
        collaboratorInfo{
          username
        }
      }
    }
  }
`;

export const ADD_DONATION = gql`
  mutation addDonation($projectId: ID!, $amount: Int!){
    addDonation(projectId: $projectId, amount: $amount){
      _id
      title
      description
      fundingGoal
      creator
      repo
      
      fundingEarned{
        _id
        amount
        donaterName
      }
    }
  }
`;

export const EDIT_BIO = gql`
  mutation editBio($userId: ID!, $bio: String) {
    editBio(userId: $userId, bio: $bio) {
      _id
      bio
    }
  }
`;
