import React from 'react';
import { Link } from 'react-router-dom';

const Comment = ({ comments = [] }) => {
  if (!comments.length) {
    return (
      <div className='comments'>
        <p>No Comments Yet</p>
      </div>
    )
  }

  return (
    <>
      <div>
        {comments &&
          comments.map((comment) => (
            <div key={comment._id}>
              <div className='comments'>
                <p className="card-header" style={{fontWeight:"bold", marginBottom:"5px"}}>Commented by: <Link className="textDecNone" to={`/profiles/${comment.commentAuthor}`}>{comment.commentAuthor}</Link></p>
                <p>{comment.commentText}</p>
                    
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Comment;
