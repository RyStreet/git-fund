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

export const EDIT_PROJECT = gql`
  mutation editProject($projectId: ID!, $title: String!, $description: String!, $fundingGoal: Int!, $repo: String!) {
    editProject(projectId: $projectId title: $title, description: $description, fundingGoal: $fundingGoal, repo: $repo) {
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

export const REMOVE_PROJECT = gql`
  mutation removeProject($projectId: ID!) {
    removeProject(projectId: $projectId) {
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

export const EDIT_PROFILE = gql`
  mutation editProfile($userId: ID!, $bio: String, $github: String, $linkedin: String) {
    editProfile(userId: $userId, bio: $bio, github: $github, linkedin: $linkedin) {
      _id
      bio
      github
      linkedin
    }
  }
`;
export const ADD_COMMENT = gql`
mutation addComment($projectId: ID!, $commentText: String!) {
  addComment(projectId: $projectID, commentText: $commentText) {
    _id
    title
    description
    fundingGoal
    creator
    repo
    
    comments {
      _id
      commentText
      commentAuthor{
        username
      }
    }
  }
}`
;
