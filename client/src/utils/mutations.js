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

// // should $name be $title instead?
// export const ADD_PROJECT = gql`
//   mutation addProject($name: String!, $description: String!, $creator: String!, $fundingGoal: Int!) {
//     addProject(name: $name, description: $description, creator: $creator, fundingGoal: $fundingGoal) {
//       _id
//       title
//       description
//       creator
//       fundingGoal

//     }
//   }
// `;

// export const REMOVE_PROJECT = gql`
  
// `;