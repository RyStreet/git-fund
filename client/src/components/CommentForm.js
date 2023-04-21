import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { ADD_COMMENT } from '../utils/mutations'
import Auth from '../utils/auth'
import { useNavigate } from "react-router-dom";
import {QUERY_SINGLE_PROJECT} from "../utils/queries"


function CommentForm({projectId}) {
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');
  
  const [addComment, {error}] = useMutation(ADD_COMMENT, {
    update(cache, {data: {addComment}}){
        try {
          const {commentAuthor} = cache.readQuery({query: QUERY_SINGLE_PROJECT});
          
          cache.writeQuery({
            query: QUERY_SINGLE_PROJECT,
            data: {commentAuthor: [addComment, ...commentAuthor]}
          })
          console.log(commentAuthor)

        } catch (err){
          console.log(error)
        }
      }
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
   console.log("comment submit")
   console.log(commentText)
    try {
      
      const { data } = await addComment({
        variables: {
          projectId,
          commentText,
        }
      });

      setCommentText('');

      navigate(0)
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText') {
      setCommentText(value);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <textarea 
          name='commentText' value={commentText} type="text"
          placeholder='Comment here...' onChange={handleChange}
        />
        <button type='submit'>Comment</button>
      </form>
      
    </div>
  )
}

export default CommentForm;