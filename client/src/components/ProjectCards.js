import React from "react"
import { Link } from 'react-router-dom'
import Donate from '../components/Donate'

import { Progress } from 'semantic-ui-react'

const ProjectCards = ({projects}) => { 
    if(!projects.length){ 
        return <h3>No Projects Yet</h3>;
    }
    return(
        <div id="projectCard">
            {projects && 
                projects.map((project) => (
                    
                    <div key={project._id} className="MainTile">  
                        <div id="projectCardHeader">
                            <h3 id="projectCardTitle">{project.title}</h3>
                            <h4>
                              By: <Link to={`/profiles/${project.creator}`}>{project.creator}</Link>
                            </h4>
                            
                            <p id="projectCardDescription">{project.description}</p>
                            {/* <p id="projectCardCategory">{project.category}</p> */}
                            {/* <ul id="projectCardLanguages">{project.languages}</ul> */}
                        </div>

                        <div id="projectCardFunding" className="btn-fund-container">
                            <h6 id="projectCardFunding"> Funding Goal: ${project.fundingGoal} </h6>
                            <h6 id="projectCardEarned"> Funding Earned: ${project.fundingEarned} </h6>
                            {/* <button id="projectCardDonate" className="button">Donate</button> */}
                            <Donate projectId={project._id} id="projectCardDonate" className="button"/>
                        </div>

                        <div>
                          <Progress percent={"10"} inverted progress success/>
                        </div>
                        
                        {/* <div id="projectCardEngagements">
                            <p id="projectCardFollows">{project.follows}</p>
                            <p id="projectCardContributors">{project.contributors}</p>
                        </div> */}

                        <Link to={`/projects/${project._id}`}>
                          View project details 
                        </Link>
                    </div>
            ))} 
        </div>


    //----------------- PUT THESE STYLES IN ABOVE AFTER CreateProject.js WORKS ---------------- //
        // <div className="MainTile">
            // <h4>Project : </h4>
            // <p>
            //   Description : 
            // </p>
            // <div className='btn-fund-container'>
            // <p>Funding -</p>
            // <button className='button' >Donate</button>
            // </div>
            // <Progress percent={"10"} inverted progress success/>
        // </div>
    // --------------------------------------------------------------------------------------- //
    )
};

export default ProjectCards;