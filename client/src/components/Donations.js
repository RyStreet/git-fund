import React from "react";

const Donations = ({fundingEarned = []}) => {
    if(!donations.length){
        return <p>No Donations Yet</p>
    }
    return (
        <>
        <div>
            {fundingEarned &&
            fundingEarned.map(fundingEarned)}
        </div>
        </>
    )
}

export default Donations: