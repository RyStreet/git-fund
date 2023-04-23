import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import Donate from '../components/Donate'
import Collaborate from '../components/Collaborate'
import Collaborators from '../components/Collaborators';
import Donations from '../components/Donations';
import CommentForm from '../components/CommentForm';
import Comment from '../components/Comment';

import { QUERY_ME } from '../utils/queries';
import { QUERY_USER } from '../utils/queries';
import { QUERY_SINGLE_PROJECT } from '../utils/queries';
import { REMOVE_PROJECT } from '../utils/mutations';

import Auth from '../utils/auth';

function SingleProject() {
  const navigate = useNavigate();

  const [ deleteBtn, setDeleteBtn ] = useState(false);
  const handleClose = () => setDeleteBtn(false);
  const handleShow = () => setDeleteBtn(true);

  const [removeProject, {error}] = useMutation(REMOVE_PROJECT);

  const { projectId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_PROJECT, {
    variables: { projectId: projectId }
  });

  const project = data?.project || {};
  
  if (!Auth.loggedIn()) {
    return (
      <div style={{height: "400px"}}>
      <Link to={'/login'} className="textDecNone">
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

  // For total donations
  let donations = project.fundingEarned
  let total = 0

  for (let i = 0; i < donations.length; i++){
   const loopDonations = donations[i].amount
   total += loopDonations
  }

  // To delete project
  const handleRemoveProject = async(event) => {
    event.preventDefault();
    console.log("Project Removed!")

    try {
      const {data} = await removeProject({
        variables: {
          projectId: project._id
        }
      })
      navigate("/profile", {replace: true});
      navigate(0);
    } catch (err) {
      console.error(err)
    }
  };

  const myProject = () => {
    const me = JSON.stringify(Auth.getProfile().data.username)
    const projectCreator = JSON.stringify(project.creator)
    if (me === projectCreator) {
      console.log("matching")
      return true;
    } else {
      console.log("not matching")
      return false;
    } 
  }
  const isMyProject = myProject()

  return (
    <>
      <div className='project'>
        <div className='project-section1'>
          <h1>{project.title}</h1>
          <h4>By: <Link className="textDecNone" to={`/profiles/${project.creator}`}>{project.creator}</Link></h4>
          <h5>{project.description}</h5>
          {/* <h5>Project Repository: {project.repo}</h5> */}
          <a className="ghIcon" style={{textDecoration:"none", color:"black"}} href={project.repo} target="_blank" rel="noreferrer" >
            <i className="github icon huge"></i>
          </a>
        </div>  

        <br/>

        <div className='single-project-section'>          
          <h4>Funding Total: ${total}</h4>
          <h4>Funding Goal: ${project.fundingGoal}</h4>
          {/* <Progress percent="80" inverted progress success/> */}
          {!isMyProject == true ? (
            <Donate projectId={project._id} className='button donate-btn' />
          ) : (
            <div></div>
          )}
        </div>

        <div className='single-project-section'>
          <h4>Collaborators:</h4>
          <h5><Collaborators collaborators={project.collaborators}/></h5>
          {!isMyProject == true ? (
            <Collaborate projectId={project._id} className='button' />
          ) : (
            <div></div>
          )}
        </div>

        {isMyProject == true ? (
          <div id="editAndDelBtns">
          <div >
            <Link to= {`/projects/${project._id}/edit`} >
            <Button className='edit-project-btn' variant='warning'>Edit</Button>
            </Link>
          </div>
  
          <div className='delete-project-btn'>
            <Button variant="danger" onClick={handleShow}>Delete</Button>
            <Modal show={deleteBtn} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Delete Project</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to permanently delete this project?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleRemoveProject}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>


          </div>
          </div>
          ) : (
          <div></div>
        )}
      </div>
      
      <div className='commentsAndDonations'>
        <div className='commentSection'>
          <div>
            <CommentForm projectId={project._id}/>
          </div>

          <div>
            <Comment comments = {project.comments}/>
          </div>
        </div>

        <div className='donationsSection'> 
          <Donations fundingEarned={project.fundingEarned}/>
        </div> 
      </div>
    </>
  )
};

export default SingleProject;