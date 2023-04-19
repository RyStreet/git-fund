import React from "react";
import { Link } from "react-router-dom";

const Donations = ({fundingEarned = []}) => {
  if(!fundingEarned.length){
    return (
      <div className='list'>
        <h4>No Donations Yet</h4>        
      </div>
    )
  }
  return (
    <>
    <div>
      {fundingEarned &&
        fundingEarned.map((donation) => (
          <div key={donation._id}>
            <div className='list' >
              {/* <p id="donationAmount"> {donation.donaterName} donated ${donation.amount}</p> */}
              <p id="donationAmount"> 
                <Link className="textDecNone" to={`/profiles/${donation.donaterName}`}>{donation.donaterName}</Link> donated ${donation.amount}
              </p>
            </div>
          </div>
        ))} 
    </div>
    </>
  )
}

export default Donations;