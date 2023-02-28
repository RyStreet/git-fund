import React from 'react';

function Project() {
  return (
    <div>
        <h1>props.projectTitle</h1>
        <h3>props.projectAuthor</h3>
        <div>
          <p>props.projectDescription</p>
          <img src='props.projectImg' alt='...'/>
        </div>
        <div>
          <button>Donate</button>
          <button>Collab</button>
        </div>
    </div>
  )
};