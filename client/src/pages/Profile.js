import React from "react";

function Profile() {
  return (
    <div>
      <div>
      <h2> Profile</h2>

        {/* <h2>{username}'s Profile</h2> */}
        {/* <p>{bio}</p> */}
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