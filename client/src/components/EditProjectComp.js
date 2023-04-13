import React, { useState } from "react";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

import { EDIT_PROJECT } from "../utils/mutations";
import { QUERY_PROJECTS, QUERY_SINGLE_PROJECT } from "../utils/queries";
import Auth from "../utils/auth";


function EditProjectComp() {
  const {projectId} = useParams()
  const [editProject, {error}] = useMutation(EDIT_PROJECT)

  const {loading, data} = useQuery(QUERY_SINGLE_PROJECT, {
    variables: {projectId: projectId}
  })
  
  const project = data?.project || []
  console.log(project)

  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [fundingGoal, setFundingGoal] = useState(project.fundingGoal);
  const [repo, setRepo] = useState(project.repo);

  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'title') {
      setTitle(event.target.value);
    }
    if (name === 'description') {
      setDescription(event.target.value);
    }
    if (name === 'fundingGoal') {
      setFundingGoal(parseInt(event.target.value));
    }
    if (name === 'repo') {
      setRepo(event.target.value);
    }
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if(title === '' ) {
      alert("You must have a title")
      return
    }
    if(description === '' ) {
      alert("You must have a description")
      return
    }
    if(repo === '' ) {
      alert("You must have a repo")
      return
    }
    if(fundingGoal === '' ) {
      alert("You must have a funding goal")
      return
    }

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

      navigate("/profile", {replace: true})
      navigate(0); 
    } catch (err) {
      console.error(err);
      console.log(project._id)
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
            rows={4} name="description" value={description} id="description" placeholder={`${project.description}`}
            className="textarea" onChange={handleChange }
          />
                
          <textarea 
            name="repo" value={repo} id="repo" placeholder={`${project.repo}`}
            className="textarea" onChange={handleChange}
          />
          
          <div className="fundingGoal">
            <label>How much funding is needed?</label>
            <input 
              name="fundingGoal" value={fundingGoal} id="fundingGoalBar" type="number" placeholder={`${project.fundingGoal}`}
              onChange={handleChange}
            />
          </div>   

          <div>
            <button className="button" type="submit">Update Project</button>
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


export default EditProjectComp;