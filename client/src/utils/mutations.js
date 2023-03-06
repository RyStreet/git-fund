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

////////// From ADD_PROJECT
// image
// fundingEarned
// languages
// category
// contributors
// comments {
//   _id
//   commentText
// }
// follows
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


`

// export const REMOVE_PROJECT = gql`
//   mutation removeProject($projectId: ID!) {
//     removeProject(projectId: $projectId) {
//       _id
//       title
//       description
//       fundingGoal
      
//     }
//   }
// `;
// // comments {
// //   _id
// //   commentText
// // }


// export const ADD_COMMENT = gql`
//   mutation addComment($projectId: ID!, $commentText: String!) {
//     addComment(projectId: $projectId, commentText: $commentText) {
//       _id
//       title
//       description
//       fundingGoal
//       creator
//       comments {
//         _id
//         commentText
//       }
//     }
//   }
// `;

// export const REMOVE_COMMENT = gql`
  
// `;