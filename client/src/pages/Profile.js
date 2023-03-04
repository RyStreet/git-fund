import React from "react";
import { Link } from "react-router-dom";
import Auth from '../utils/auth';
import { useQuery } from "@apollo/client";
import {QUERY_ME} from "../utils/queries"
import ProjectCards from "../components/ProjectCards";

function Profile() {
  const {loading, data} = useQuery(QUERY_ME)
  const user = data?.me || []
  console.log(user)
  const projects = user.projects
  console.log(projects)

  return (
    <div>
      <div>
        {Auth.loggedIn() ? (
          <>
            <h2>{user.username}'s Profile</h2>
            <h5>Email: {user.email}</h5>
            <h5>Bio:</h5>
            <p>{user.bio}</p>


            <div>
        {loading ? (
            <div>Loading...</div>
          ) : (
            <ProjectCards
              projects={projects}
            />
          )}
      </div>
              <div>
                <h4>Followed Projects:</h4>
                {/* {followedProjects} */}
            </div>
          </>
        ) : (
          <Link to={'/login'}>
            <h1>Login or sign up to view your profile</h1>
          </Link>
        )}
      </div>       
    </div>
  )
};

export default Profile;