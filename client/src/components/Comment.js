import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { REMOVE_COMMENT } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import { QUERY_SINGLE_PROJECT } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';





const Comment = ({ comments = [] }) => {

const [removeComment, {error}] = useMutation(REMOVE_COMMENT)

const { projectId } = useParams();
const navigate = useNavigate()

const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
  variables: { projectId: projectId}

});

const project = data?.project || {};

let comment = comments.map(({_id}) => _id)
console.log(comment)
        
   


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
            console.log(comment._id),

            <div key={comment._id} >
              <div className='comments'>
                <p className="card-header" style={{fontWeight:"bold", marginBottom:"5px"}}>Commented by: <Link className="textDecNone" to={`/profiles/${comment.commentAuthor}`}>{comment.commentAuthor}</Link></p>
                <p>{comment.commentText}</p>
                

                {comment.commentAuthor == Auth.getProfile().data.username ? (
                <div>
                  <Button variant="danger" onClick={    
                    
                    async(event) => {
                      event.preventDefault()
                      console.log("Comment removed")
                    
                      try{
                        let {data} = await removeComment({
                          variables: {
                            projectId: project._id,
                            commentId: comment._id
                          }
            
                        })
                        navigate(0);
                        
                      }catch(err){
                        console.log(err)
                      }

                    }
                    
                    
                  }>Delete</Button>
                </div>
              ) : (
                <div></div>
              )}

              </div>

              

            </div>
            
          ))}
      </div>
    </>
  );

  


};





export default Comment;
