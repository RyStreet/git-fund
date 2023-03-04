import React from "react"

const ProjectCards = ({projects}) => {
    console.log(projects)
    if(!projects.length){
        return <h3>No Projects Yet</h3>;
    }
    return(

        
        <div id="projectCard">
            {projects && 
            projects.map((projects) => ( 
                
                <div key={projects._id}>  
                    <div id="projectCardHeader">
                        <h3 id="projectCardTitle">{projects.title}</h3>
                        
                        <p id="projectCardDescription">{projects.description}</p>
                        {/* <p id="projectCardCategory">{project.category}</p> */}
                        {/* <ul id="projectCardLanguages">{project.languages}</ul> */}
                    </div>

                    <div id="projectCardFunding">
                        <p id="projectCardFunding"> Funding - {projects.fundingGoal} </p>
                        {/* <p id="projectCardEarned"> Funding Earned - {project.fundingEarned} </p> */}
                        <btn id="projectCardDonate">Donate</btn>
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