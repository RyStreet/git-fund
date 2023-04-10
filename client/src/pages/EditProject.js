import React, { useState } from "react";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

import { EDIT_PROJECT } from "../utils/mutations";
import { QUERY_PROJECTS, QUERY_SINGLE_PROJECT } from "../utils/queries";



import Auth from "../utils/auth";


function EditProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fundingGoal, setFundingGoal] = useState('');
  const [repo, setRepo] = useState('');
  const navigate = useNavigate()
  const {projectId} = useParams()
  const [editProject, {error}] = useMutation(EDIT_PROJECT)

  const {loading, data} = useQuery(QUERY_SINGLE_PROJECT, {
    variables: {projectId: projectId}
  })
  const project = data?.project || []
  console.log(project)

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await editProject({
        variables: {
          projectId: project._id,
          title,
          description,
          fundingGoal,
          repo
        },
      });

      setTitle(``);
      setDescription('');
      setFundingGoal('');
      setRepo('');

      navigate("/profile", {replace: true})
      navigate(0); //////////////////////checking if refreshes on heroku
    } catch (err) {
      console.error(err);
      console.log(project._id)
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
        <h2>Edit Project</h2>
        <form onSubmit={handleFormSubmit} className="newProject_form">
          
          
            <textarea 
              name="title" value={title} id="title" placeholder={`${project.title}`}
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


export default EditProject;