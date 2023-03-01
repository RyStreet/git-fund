import React from "react"

function ProjectCards() {
    return(
    <div id="projectCard">
        
        <div id="projectCardHeader">
            <h3 id="projectCardTitle">{title}</h3>
            <p id="projectCardCreator">{creator}</p>
            <p id="projectCardDescription">{description}</p>
            <p id="projectCardCategory">{category}</p>
            <ul id="projectCardLanguages">{languages}</ul>
        </div>

        <div id="projectCardFunding">
            <p id="projectCardFunding"> Funding - {fundingGoal} </p>
            <p id="projectCardEarned"> Funding Earned - {fundingEarned} </p>
            <btn id="projectCardDonate">Donate</btn>
        </div>

        <div id="projectCardEngagements">
            <p id="projectCardFollows">{follows}</p>
            <p id="projectCardContributors">{contributors}</p>
        </div>

    </div>
    )
};

export default ProjectCards;