import React, {useState} from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { EDIT_PROFILE } from "../utils/mutations";

import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "../utils/queries"
import Auth from "../utils/auth"

function EditProfileComp () {
    const { username: userParam} = useParams()
    const [editProfile, {error}] = useMutation(EDIT_PROFILE)  
    
    const {loading, data} = useQuery(userParam? QUERY_USER: QUERY_ME, {
        variables: {username: userParam}
    });
    const user = data?.me || []
    console.log(user)

    const [bio, setBio] = useState(user.bio)
    const [linkedin, setLinkedin] = useState(user.linkedin)
    const [github, setGithub] = useState(user.github) 

    const navigate = useNavigate()
    
    const handleChange = (event) => {    
        const {name, value} = event.target;

        if (name === "bio"){
            setBio(event.target.value)
        }
        if (name === "github"){
            setGithub(value)
        }
        if(name === "linkedin"){
            setLinkedin(event.target.value)
        }
    };
    
    const handleEditProfile = async (event) => {
        event.preventDefault();

        if(bio === '' ) {
            alert("You must have a bio")
            return
        }
        if(linkedin === '' ) {
            alert("You must have a LinkedIn")
            return
        }
        if(github === '' ) {
            alert("You must have a GitHub")
            return
        }


        try{
            const {data} = await editProfile({
                variables: {
                    userId: user._id,
                    bio,
                    linkedin,
                    github
                }         
            })

            navigate("/profile", {replace: true});
            navigate(0);
        }catch (err){
            console.error(err)
        }
        
    };


    return(
        <div style={{justifyContent: "center"}}>
            {Auth.loggedIn() ? (
            <div>
                <h2 style={{marginLeft: "10%", marginTop: "1%"}}>{`Now Editing ${user.username}'s Profile`} </h2>
                    <div id="editProfileContainer">
                
                        <div className="ui form">
                            <form id="editProfileForm" onSubmit={handleEditProfile}>
                                
                                <label>LinkedIn</label>
                                <textarea 
                                   style={{width: "60vw"}}  id="linkedin"  name="linkedin" onChange={handleChange} placeholder={`${user.linkedin}`} value={linkedin} 
                                />

                                <label>Github</label>
                                <textarea  
                                  
                                  style={{width: "60vw"}} id="github"  name="github" onChange={handleChange}  placeholder={`${user.github}`} value={github} rows="1"
                                />

                                <label>Bio</label>
                                <textarea 
                                    
                                    style={{width: "60vw"}}  id="bio"  name="bio" onChange={handleChange} placeholder={`${user.bio}`} value={bio}
                                />

                                <button type="submit" className="ui submit button">Edit Profile</button>
                            </form>
                        
                        </div>
                    </div>
            </div>
            ) : (
                <h3>Login or sign up to edit your profile</h3>
            )}
        </div>
    )



    
}

export default EditProfileComp;