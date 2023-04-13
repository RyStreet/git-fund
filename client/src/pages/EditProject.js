import React, { useState } from "react";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

import { EDIT_PROJECT } from "../utils/mutations";
import { QUERY_PROJECTS, QUERY_SINGLE_PROJECT } from "../utils/queries";
import Auth from "../utils/auth";


function EditProject() {
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
  

  // const handleChange = (event) => {
  //   const { name, value } = event.target;

  //   if(!project.title.value){
  //     setTitle(project.title)
  //     console.log("no title change")
  //   }

    // if(!project.description.value){
    //   setDescription(project.description)
    //   console.log("no description change")
    // }

  //   if(!project.repo.value){
  //     setRepo(project.repo)
  //     console.log("no repo change")
  //   }
    
  //   if(!project.fundingGoal.value){
  //    setFundingGoal(project.fundingGoal)
  //   console.log("no funding goal change")
  //   }
    

  //   if (name === 'title') {
  //     setTitle(value);
  //   }
  //   if (name === 'description') {
  //     setDescription(value);
  //   }
  //   if (name === 'fundingGoal') {
  //     setFundingGoal(parseInt(value));
  //   }
  //   if (name === 'repo') {
  //     setRepo(value);
  //   }
  // };


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

      // setTitle('');
      // setDescription('');
      // setFundingGoal('');
      // setRepo('');
      

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
            className="textarea" onChange={(e) => setTitle(e.target.value)}
          />
        
          <textarea 
            rows={4} name="description" value={description} id="description" placeholder={`${project.description}`}
            className="textarea" onChange={(e) => setDescription(e.target.value) }
          />
                
          <textarea 
            name="repo" value={repo} id="repo" placeholder={`${project.repo}`}
            className="textarea" onChange={(e) => setRepo(e.target.value)}
          />
          
          <div className="fundingGoal">
            <label>How much funding is needed?</label>
            <input 
              name="fundingGoal" value={fundingGoal} id="fundingGoalBar" type="number" placeholder={`${project.fundingGoal}`}
              onChange={(e) => setFundingGoal(parseInt(e.target.value))}
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


export default EditProject;