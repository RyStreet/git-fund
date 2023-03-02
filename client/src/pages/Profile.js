import React from "react";

import Auth from '../utils/auth';

function Profile() {
  return (
    <div>
      <div>
      <h2>Profile</h2>
        {Auth.loggedIn() ? (
          <>
            <h2>{Auth.getProfile().data.username}'s Profile</h2>
            <h6>Bio:</h6>
            <p>{Auth.getProfile().data.bio}</p>

            <div>
              <h2>My Projects</h2>
                {/* {userProjects} */}
            </div>
              <div>
                <h2>Followed Projects</h2>
                {/* {followedProjects} */}
            </div>
          </>
        ) : (
          <h1>Login or Sign Up first!</h1>
        )}
      </div>  
      
    </div>
  )
};

export default Profile;