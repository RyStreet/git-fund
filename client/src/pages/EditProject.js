import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from 'react-router-dom';

import { EDIT_PROJECT } from "../utils/mutations";
import { QUERY_SINGLE_PROJECT } from "../utils/queries";
import Auth from "../utils/auth";
import EditProjectComp from "../components/EditProjectComp";


function EditProject() {
  const {projectId} = useParams()
  const [editProject, {error}] = useMutation(EDIT_PROJECT)

  const {loading, data} = useQuery(QUERY_SINGLE_PROJECT, {
    variables: {projectId: projectId}
  })
  
  const project = data?.project || []
  console.log(project)

  return (
    <div >
      {Auth.loggedIn() ? (
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <EditProjectComp
              project={project}
            />
          )}
          </div>
        ) : (
          <div>Login to edit </div>
        )}
    </div>
  )
};


export default EditProject;