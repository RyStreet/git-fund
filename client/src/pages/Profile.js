import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Auth from '../utils/auth';
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "../utils/queries"
import ProjectCards from "../components/ProjectCards";

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

  return (
    <div>
      <div>
        <h2>{userParam ? `Now Viewing ${user.username}'s` : `Your`} Profile</h2>
        <h5>Email: {user.email}</h5>
        <h5>GitHub:</h5>
        <h5>Bio:</h5>
        <p>{user.bio}</p>

        <div>
          <ProjectCards
            projects={projects}
          />
        </div>

        <div>
          <h4>Followed Projects:</h4>
          {/* {followedProjects} */}
        </div>

      </div>       
    </div>
  )
};

export default Profile;