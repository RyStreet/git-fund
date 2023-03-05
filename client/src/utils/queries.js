import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      projects {
        _id
        title
        description
        fundingGoal
        creator
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      projects {
        _id
        title
        description
        fundingGoal
        creator

      }
    }
  }
`;

export const QUERY_PROJECTS = gql`
  query getProjects { 
    projects{
      _id
      title
      description
      fundingGoal
      fundingEarned
      creator
      repo
    }
  }
`;

export const QUERY_SINGLE_PROJECT = gql`
  query getSingleProject($projectId: ID!) {
    project(projectId: $projectId) {
      _id
      title
      description
      
      fundingGoal
      fundingEarned
      creator
      repo

    }
  }
`;
// image
// fundingEarned
//       languages
//       category     
//       contributors
//       comments {
//         _id
//         commentText
//         commentAuthor
//       }
//       follows