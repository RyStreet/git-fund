import React, {useState} from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { EDIT_PROFILE } from "../utils/mutations";

import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";

function EditProfileComp () {
  const { username: userParam} = useParams();
  const [editProfile, {error}] = useMutation(EDIT_PROFILE);
    
  const {loading, data} = useQuery(userParam? QUERY_USER: QUERY_ME, {
    variables: {username: userParam}
  });
  const user = data?.me || []
  console.log(user);

  const [bio, setBio] = useState(user.bio);
  const [linkedin, setLinkedin] = useState(user.linkedin);
  const [github, setGithub] = useState(user.github);

  const navigate = useNavigate();

  const handleChange = (event) => {    
    const {name, value} = event.target;

    if (name === "bio"){
        setBio(event.target.value);
    }
    if (name === "github"){
        setGithub(value);
    }
    if(name === "linkedin"){
        setLinkedin(event.target.value);
    }
  };

  const handleEditProfile = async (event) => {
    event.preventDefault();

    if(bio === '' ) {
      alert("You must have a bio");
      return;
    }
    if(linkedin === '' ) {
      alert("You must have a LinkedIn");
      return;
    }
    if(github === '' ) {
      alert("You must have a GitHub");
      return;
    }

    try{
      const {data} = await editProfile({
        variables: {
          userId: user._id,
          bio,
          linkedin,
          github
        },         
      });

      navigate("/profile", {replace: true});
      navigate(0);
    } catch (err){
      console.error(err)
    }  
  };

  return(
    <div>
      {Auth.loggedIn() ? (
        <div className="newProject">
          <h2>{`Now Editing ${user.username}'s Profile`} </h2>
            <form className="newProject_form" onSubmit={handleEditProfile}>                                
              <label className="editProfileSectionTitles">LinkedIn</label>
              <textarea 
                className="textarea" id="linkedin"  name="linkedin" rows={1}
                onChange={handleChange} placeholder={`${user.linkedin}`} value={linkedin} 
              />     

              <label className="editProfileSectionTitles">Github</label>
              <textarea        
                className="textarea" id="github" name="github" rows={1}
                onChange={handleChange}  placeholder={`${user.github}`} value={github}
              />

              <label className="editProfileSectionTitles">Bio</label>
              <textarea 
                className="textarea" id="bio" name="bio" rows={4}
                onChange={handleChange} placeholder={`${user.bio}`} value={bio}
              />

              <div>
                <button type="submit" className="ui submit button">Edit Profile</button>
              </div>
            </form>
        </div>
      ) : (
        <h3>Login or sign up to edit your profile</h3>
      )}
    </div>
  );  
};

export default EditProfileComp;