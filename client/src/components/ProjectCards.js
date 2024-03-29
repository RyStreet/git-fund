import React from "react"
import { Link } from 'react-router-dom'


const ProjectCards = ({projects}) => { 
  if(!projects?.length){ 
    return <h4 style={{marginLeft: "5%", marginTop: ".5%"}}>No Projects Yet</h4>;
  }
  return(
    <div id="projectCard">
      {projects && 
        projects.map((project) => (     
          <div key={project._id} className="MainTile my-4">     
            <div id="projectCardHeader">
              <Link to={`/projects/${project._id}`} className="textDecNone">
                <h3 id="projectCardTitle">{project.title}</h3>
              </Link>
              <h4>
                By: <Link className="textDecNone" to={`/profiles/${project.creator}`}>{project.creator}</Link>
              </h4>
                        
              {project.description.length > 80 ?
                <p id="projectCardDescription">                              
                  {project.description.substring(0, 80)}....
                </p>
                :
                <p id="projectCardDescription">
                  {project.description}
                  <br/>
                  <br/>
                </p>
              }
                        
              {/* <p id="projectCardCategory">{project.category}</p> */}
              {/* <ul id="projectCardLanguages">{project.languages}</ul> */}
            </div>

            <br/>

            <div id="projectCardFunding" className="btn-fund-container">
              <h6 id="projectCardFunding"> Funding Goal: ${project.fundingGoal} </h6>
              {/* <div><Progress percent={"10"} inverted progress success/></div> */}
            </div>

          </div>
        ))} 
    </div>
  )
};

export default ProjectCards;