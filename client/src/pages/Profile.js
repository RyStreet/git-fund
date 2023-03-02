import React from "react";

import Auth from '../utils/auth';

function Profile() {
  return (
    <div>
      <div>
      <h2>Profile</h2>
        {Auth.loggedIn() ? (
          <>
            <span>{Auth.getProfile().data.username}'s Profile</span>
            {/* <p>{bio}</p> */}
          </>
        ) : (
          <h1>Login or Sign Up first!</h1>
        )}
      </div>

      <div>
        <button>New Project</button>
      </div>
      
      <div>
        <h2>My Projects</h2>
        {/* {userProjects} */}
      </div>

      <div>
        <h2>Followed Projects</h2>
        {/* {followedProjects} */}
      </div>
      
    </div>
  )
};

export default Profile;