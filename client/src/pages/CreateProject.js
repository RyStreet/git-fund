import React, { useState } from "react";
import { ApolloError, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { ADD_PROJECT } from "../utils/mutations";
import { QUERY_PROJECTS } from "../utils/queries";

import Auth from "../utils/auth";


function CreateProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fundingGoal, setFundingGoal] = useState('');
  const [repo, setRepo] = useState('');
  const navigate = useNavigate()

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

    try {
      const { data } = await addProject({
        variables: {
          title,
          description,
          fundingGoal,
          repo,
          creator: Auth.getProfile().data.username,
        },
      });

      setTitle('');
      setDescription('');
      setFundingGoal('');
      setRepo('');

      navigate("/profile", {replace: true})
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
      setFundingGoal(parseInt(value));
    }
    if (name === 'repo') {
      setRepo(value);
    }
  };

  return (
    <div >
      {Auth.loggedIn() ? (
      <div className="newProject">
        <h2>Post New Project</h2>
        <form onSubmit={handleFormSubmit} className="newProject_form">
          
          
            <textarea 
              name="title" value={title} id="title" placeholder="What is your project title?"
              className="textarea" onChange={handleChange}
            />
          
        
          
            <textarea 
              rows={4} name="description" value={description} id="description" placeholder="What is your project description?"
              className="textarea" onChange={handleChange}
              />
           

          
            <textarea 
              name="repo" value={repo} id="repo" placeholder="Provide project repository's URL"
              className="textarea" onChange={handleChange}
              />
          

          <div className="fundingGoal">
            <label>How much funding is needed?</label>
            <input 
              name="fundingGoal" value={fundingGoal} id="fundingGoalBar" type="number" 
               onChange={handleChange}
            />
          </div>   

          <div>
            <button className="button" type="submit">Post Project</button>
          </div>

          {error && (
            <div>
              {error.message}
            </div>
          )}
        </form>
      </div>
      ) : (
        <h3>Login or sign up to create a new project</h3>
      )}
    </div>
  )
};


export default CreateProject;