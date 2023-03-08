import React from "react";

const Donations = ({fundingEarned = []}) => {
    if(!fundingEarned.length){
        return <p>No Donations Yet</p>
    }
    return (
        <>
        <div>
            {fundingEarned &&
            fundingEarned.map((donation) => (
                <div key={donation._id}>
                    <div>
                        <p id="donationAmount">{donation.donaterName} Donated ${donation.amount}</p>
                    </div>
                </div>
            ))} 
        </div>
        </>
    )
}

export default Donations;