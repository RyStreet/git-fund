import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      password
      userProjects {
        projectID
        title
        description
        image
        fundingGoal
        fundingEarned
        languages
        category
        creator
        contributors
        comments
        follows
      }
    },
  }
`;

export const QUERY_PROJECTS = gql`
 {
  projects{
    _id
    title
    description
    image
    fundingGoal
    fundingEarned
    languages
    category
    creator
    contributors
    comments
    follows

  }
}

`

// // may need queries for getting all projects and getting single projects. like getProjects and getSingleProject
