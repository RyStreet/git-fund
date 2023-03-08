import React,  {useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Auth from '../utils/auth';
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "../utils/queries"
import ProjectCards from "../components/ProjectCards";
import { useMutation } from "@apollo/client";
import { EDIT_BIO } from '../utils/mutations'

import EdiText from 'react-editext';


function Profile() {  
  const navigate = useNavigate()

  // For bio 
  const [bio, setBio] = useState('');
  const [editBio, {error}] = useMutation(EDIT_BIO);

  const { username: userParam } = useParams();
  const {loading, data} = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || []
  
  const projects = user.projects
  const collabProjects = user.collabProjects

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />
  }
  if (!Auth.loggedIn()) {
    return (
      <Link to={'/login'} className="textDecNone">
        <h1>Login or sign up to view user profiles</h1>
      </Link>
    )
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  // For saving and editing bio
  const handleSaveBio = async (bio) => {
    console.log('New Bio Saved:', bio);
    try {
      const {data} = await editBio({
        variables: {
          userId: user._id,
          bio
        }
      })
      setBio("");
     
      navigate("/profile", {replace: true})
    } catch (err) {
      console.error(err)
    }
  };

  const handleChange = (event) => {
    let { name, value} = event.target;

    if(name= "bio") {
      setBio(value)
    }
  }

  return (
    <div className="profileMargins">
      <div>
        <h2>{userParam ? `Now Viewing ${user.username}'s` : `Your`} Profile</h2>
        <h5>Email: {user.email}</h5>
        {/* <h5>GitHub:</h5> */}
        {/* <h5>Bio: {user.bio}</h5>
        {!userParam ? (
          <EdiText name="bio" type='text' value={bio} onSave={handleSaveBio} onChange={handleChange}/>
        ): (
        <></>
        )}      */}
        
        {!userParam ? (
          <div>
            <h5 style={{maxWidth:"70%"}}>Bio: {user.bio}</h5>
            <EdiText 
              name="bio" type='textarea' value={bio} 
              editButtonContent="Edit"
              inputProps={{ placeholder:"Edit your bio here", style: {maxWidth:"70%"}, rows: 3 }}
              onSave={handleSaveBio} onChange={handleChange}
            />
          </div>
        ) : (
          <h5 style={{maxWidth:"70%"}}>Bio: {user.bio}</h5>
        )}     

      <br/>

        <div>
          <h3>{userParam ? `${user.username}'s` : `Your`} Projects:</h3>
          <ProjectCards
            projects={projects}
          />
        </div>
      
      <br/>

        <div>
          <h3>Collaborated Projects:</h3>
          <ProjectCards
            projects={collabProjects}
          />
        </div>

      </div>       
    </div>
  )
};

export default Profile;