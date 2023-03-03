import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_PROJECT } from "../utils/mutations";
import { QUERY_PROJECTS } from "../utils/queries";

import Auth from "../utils/auth";

function CreateProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fundingGoal, setFundingGoal] = useState('');

  const [addProject, { error }] = useMutation(ADD_PROJECT, {
    update(cache, { data: { addProject } }) {
      try {
        const { projects } = cache.readQuery({ query: QUERY_PROJECTS });

        cache.writeQuery({
          query: QUERY_PROJECTS,
          data: { projects: [addProject, ...projects] },
        });
      } catch (e) {
        console.error(e)
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('handleFormSubmit')
    try {
      const { data } = await addProject({
        variables: {
          title,
          description,
          fundingGoal,
          //test userID. might not need it here
          // userID: Auth.getProfile().data.username,
        },
      });

      setTitle('');
      setDescription('');
      setFundingGoal('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'title') {
      setTitle(value);
    }
    if (name === 'description') {
      setDescription(value);
    }
    if (name === 'fundingGoal') {
      setFundingGoal(value);
    }
    console.log('handleChange')
  };

  return (
    <div>
        <h1>Post New Project</h1>
        <form onSubmit={handleFormSubmit}>
          <div>
            <textarea 
              name="title" value={title} id="title" placeholder="What is your project title?"
              className="" onChange={handleChange}
            />
          </div> 

          <div>
            <textarea 
              name="description" id="description" placeholder="What is your project description?"
              className="" onChange={handleChange}
              />
          </div>  

          <div>
            <label>How much funding is needed?</label>
            <input 
              name="fundingGoal" id="fundingGoal" type="number" 
              className="" onChange={handleChange}
            />
          </div>   
          
          {/* <div>
            <input id="contributors" type="text" name="contributors" placeholder="Optional: What kind of collaboration is needed?"/>
          </div>      */} 

          {/* <div>
            <label>Languages used:</label>
            <input id="languages" type="text" name="languages"/>
          </div> */}

          <div>
            <button type="submit">Post Project</button>
          </div>

          {error && (
            <div>
              {error.message}
            </div>
          )}
        </form>
    </div>
  )
};

export default CreateProject;