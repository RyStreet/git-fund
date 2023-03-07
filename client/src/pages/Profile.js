import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Auth from '../utils/auth';
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "../utils/queries"
import ProjectCards from "../components/ProjectCards";
import { Card, Image } from "semantic-ui-react";
const ProjectList = ({ projects }) => {
  return (
    <ul>
      {projects.map((project, index) => (
        <li key={index}>
          <a href={project.url}>{project.name}</a>
        </li>
      ))}
    </ul>
  );
};

function Profile() {
  const { username: userParam } = useParams();
  const {loading, data} = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || []
  console.log(user)
  const projects = user.projects
  console.log(projects)

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />
  }
  if (!user?.username) {
    return (
      <Link to={'/login'}>
        <h1>Login or sign up to view your profile</h1>
      </Link>
    )
  }
  if (loading) {
    return <div>Loading...</div>;
  }
  const projectss = [
    { name: 'Project 1', url: 'https://github.com/user/project1' },
    { name: 'Project 2', url: 'https://github.com/user/project2' },
    { name: 'Project 3', url: 'https://github.com/user/project3' },
  ];
  // return (
  //   <div>
  //     <div>
  //       <h2>{userParam ? `Now Viewing ${user.username}'s` : `Your`} Profile</h2>
  //       <h5>Email: {user.email}</h5>
  //       <h5>GitHub:</h5>
  //       <h5>Bio:</h5>
  //       <p>{user.bio}</p>

  //       <div>
  //         <ProjectCards
  //           projects={projects}
  //         />
  //       </div>

  //       <div>
  //         <h4>Followed Projects:</h4>
  //         {/* {followedProjects} */}
  //       </div>

  //     </div>       
  //   </div>
  // )
  return  (
    <Card>
    <Image src="https://via.placeholder.com/150" wrapped ui={false} />
    <Card.Content>
      <Card.Header>{userParam ? `Now Viewing ${user.username}'s` : `Your`} Profile</Card.Header>
      <Card.Meta>
        <span className="email">{user.email}</span>
      </Card.Meta>
      <Card.Description>{user?.bio}</Card.Description>
    </Card.Content>
    <Card.Content>
        <Card.Header>Projects</Card.Header>
        <ProjectList projects={projectss} />
      </Card.Content>
    <Card.Content extra>
      <a href={``}>
        <i className="fab fa-github"></i>
        GitHub
      </a>
    </Card.Content>
  </Card>
  )
};

export default Profile;