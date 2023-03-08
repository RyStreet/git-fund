import React,  {useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Auth from '../utils/auth';
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "../utils/queries"
import ProjectCards from "../components/ProjectCards";
import { useMutation } from "@apollo/client";
import { EDIT_BIO } from '../utils/mutations'
import EdiText from 'react-editext';

function Profile() {
  const [bio, setBio] = useState('');

  const [editBio, {error}] = useMutation(EDIT_BIO);

  const { username: userParam } = useParams();
  const {loading, data} = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || []
  console.log(user)
  const projects = user.projects
  const collabProjects = user.collabProjects
  console.log("USERPROJECT", projects)
  console.log("collabPROJECT", collabProjects)


  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />
  }
  if (!Auth.loggedIn()) {
    return (
      <Link to={'/login'}>
        <h1>Login or sign up to view your profile</h1>
      </Link>
    )
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSaveBio = async (event) => {
    console.log('New Bio Saved:', bio);

    try {
      const {data} = await editBio({
        variables: {
          userId: Auth.getProfile().data._id,
          bio
        }
      })
      setBio(bio);
      console.log(user)
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
    <div>
      <div>
        <h2>{userParam ? `Now Viewing ${user.username}'s` : `Your`} Profile</h2>
        <h5>Email: {Auth.getProfile().data.email}</h5>
        <h5>GitHub:</h5>
        {/* <h5>Bio:</h5> */}
        <EdiText name="bio" type='text' value={bio} onSave={handleSaveBio} onChange={handleChange}/>
        <p>{user.bio}</p>

        <div>
          <ProjectCards
            projects={projects}
          />
        </div>

        <div>
          <h4>Collaborated Projects:</h4>
          <ProjectCards
            projects={collabProjects}
          />
        </div>

      </div>       
    </div>
  )
};

export default Profile;