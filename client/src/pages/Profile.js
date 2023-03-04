import React from "react";
import { Link } from "react-router-dom";
import Auth from '../utils/auth';

function Profile() {
  console.log(Auth.getProfile())
  return (
    <div>
      <div>
        {Auth.loggedIn() ? (
          <>
            <h2>{Auth.getProfile().data.username}'s Profile</h2>
            <h5>Bio:</h5>
            <p>{Auth.getProfile().data.bio}</p>

            <div>
              <h4>My Projects:</h4>
                {Auth.getProfile().data.userProjects}
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