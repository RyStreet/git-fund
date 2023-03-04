import React from "react"

const ProjectCards = ({projects}) => { 
    if(!projects.length){ 
        return <h3>No Projects Yet</h3>;
    }
    return(
        <div id="projectCard">
            {projects && 
                projects.map((project) => (
                    
                    <div key={project._id}>  
                        <div id="projectCardHeader">
                            <h3 id="projectCardTitle">{project.title}</h3>
                            <h4>By: {project.creator}</h4>
                            
                            <p id="projectCardDescription">{project.description}</p>
                            {/* <p id="projectCardCategory">{project.category}</p> */}
                            {/* <ul id="projectCardLanguages">{project.languages}</ul> */}
                        </div>

                        <div id="projectCardFunding">
                            <p id="projectCardFunding"> Funding - {project.fundingGoal} </p>
                            {/* <p id="projectCardEarned"> Funding Earned - {project.fundingEarned} </p> */}
                            <button id="projectCardDonate">Donate</button>
                        </div>

                        {/* <div id="projectCardEngagements">
                            <p id="projectCardFollows">{project.follows}</p>
                            <p id="projectCardContributors">{project.contributors}</p>
                        </div> */}
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