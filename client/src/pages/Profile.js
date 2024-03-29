import React,  {useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Auth from '../utils/auth';
import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "../utils/queries"
import ProjectCards from "../components/ProjectCards";
import { useMutation } from "@apollo/client";
import { EDIT_PROFILE } from '../utils/mutations'

function Profile() {  
  const navigate = useNavigate()

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
      <div style={{height: "400px"}}>
      <Link  to={'/login'} className="textDecNone">
        <div className="msgScreen">
          <h2>Login or sign up to view user profiles</h2>
        </div>
      </Link>
      </div>
    )
  }
  if (loading) {
    return <div>Loading...</div>
  }

  ///////////////TESTING. EMAIL DOESN'T WORK WITH MAILTO
  const email = user.email
  console.log(email)

  return (
    <div className="profileMargins">

      <div className="profileSection">
        <h2>{userParam ? `Now Viewing ${user.username}'s` : `Your`} Profile</h2>
        <div style={{marginBottom: 20}}>
          {/* <h5 style={{marginBottom:10}} href={user.email}>Email: {user.email}</h5> */}

          <a style={{textDecoration:"none", color:"#5A5A5A"}} onClick={() => window.location.href = `mailto:${user.email}`}>
            <i className="mail icon huge" ></i>
          </a>
      
          <a style={{textDecoration:"none"}} href={user.linkedin} target="_blank" rel="noreferrer">
            <i className="linkedin icon huge" ></i>
          </a>
             
          <a style={{textDecoration:"none", color:"black"}} href={user.github} target="_blank" rel="noreferrer" >
            <i className="github icon huge"></i>
          </a>
        </div >

        {!userParam ? (
          <div>
            <h5 style={{maxWidth:"70%", marginBottom:15}}>Bio: {user.bio}</h5>
            <a href="edit-profile">
              <div className="ui vertical animated button" tabIndex="0">
                <div className="hidden content">
                  Edit Profile
                </div>
                <div className="visible content">
                  <i className="pencil alternate icon"></i>
                </div>
              </div>
            </a>
          </div>
        ) : (
          <h5 style={{maxWidth:"70%"}}>Bio: {user.bio}</h5>
        )}
      </div>   

      <br/>

      <div>
        <div style={{marginLeft: "3%"}}>
          <h3>{userParam ? `${user.username}'s` : `Your`} Projects:</h3>
          
          {!userParam ? 
            <Link style={{}} to='/create-project'>
              <button style={{backgroundColor:'#FE9F00'}} className='button'>+ New Project</button>
            </Link> 
            :
            <div></div>
          }
        </div>
        <ProjectCards
          projects={projects}
        />
      </div>
      
      <br/>

      <div>
        <div style={{marginLeft: "3%"}}>
          <h3>Collaborated Projects:</h3>
        </div>
        <ProjectCards
          projects={collabProjects}
        />
      </div>
   
    </div>
  )
};

export default Profile;