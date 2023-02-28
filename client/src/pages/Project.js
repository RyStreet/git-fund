import React from 'react';


function Project() {
  return (
    <div>
        <h1>project.projectTitle</h1>
        <h3>project.projectAuthor</h3>
        <h5>project.postedAt</h5>

        <div>
          <h5>Description</h5>
          <p>project.projectDescription</p>
          <img src='project.projectImg' alt='...'/>
        </div>

        <div>
          <h6>Needed funding:</h6>
          <p>project.fundingGoal</p>
        </div>

        <div>
          <div>
            <button>Follow</button>
            <p>followCount</p>
          </div>
          <button>Donate</button>
          <button>Collab</button>
        </div>
    </div>
  )
};

export default Project;