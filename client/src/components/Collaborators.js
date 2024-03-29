import React from 'react';
import { Link } from 'react-router-dom';

const Collaborators = ({ collaborators = [] }) => {
  if (!collaborators.length) {
    return <p>No Collaborators Yet</p>;
  }

  return (
    <>
      <div>
        {collaborators &&
          collaborators.map((collaborator) => (
            <div key={collaborator._id}>
              <div style={{margin: "10px" }}>
                <p className="card-header">Name: <Link  className="textDecNone" to={`/profiles/${collaborator.collaboratorInfo.username}`}>{collaborator.collaboratorInfo.username}</Link></p>
                <p>Role: {collaborator.collabNotes}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Collaborators;
