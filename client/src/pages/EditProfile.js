import React from "react";
import { useParams } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { EDIT_PROFILE } from "../utils/mutations";

import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "../utils/queries"

import Auth from "../utils/auth"
import EditProfileComp from "../components/EditProfileComp";


function EditProfileContent() {
  const { username: userParam} = useParams()
  const [editProfile, {error}] = useMutation(EDIT_PROFILE)

  const {loading, data} = useQuery(userParam? QUERY_USER: QUERY_ME, {
    variables: {username: userParam}
  });

  const user = data?.me || []
  console.log(user)

  return(
    <div style={{justifyContent: "center"}}>
      {Auth.loggedIn() ? (
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <EditProfileComp 
              user={user}
            />
          )}
        </div>
        ) : (
          <h3>Login or sign up to edit your profile</h3>
        )}
    </div>
  ) 
}

export default EditProfileContent;