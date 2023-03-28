import React, {useState} from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import { empty, useMutation } from "@apollo/client";
import { EDIT_PROFILE } from "../utils/mutations";

import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "../utils/queries"

import Auth from "../utils/auth"

//create and edit linkedin
//create and edit github
//create and edit bio
//edit email

function EditProfileContent () {
    const navigate = useNavigate()

    const [bio, setBio] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [github, setGithub] = useState('')
    const [editProfile, {error}] = useMutation(EDIT_PROFILE)

    const { username: userParam} = useParams()
    

    const {loading, data} = useQuery(userParam? QUERY_USER: QUERY_ME, {
        variables: {username: userParam}
    });
    const user = data?.me || []
    console.log(user)

    
    const handleEditProfile = async(event) => {
        event.preventDefault();

        console.log("hit")
        console.log(user)



        try{
            const {data} = await editProfile({
                variables: {
                    userId: user._id,
                    bio,
                    linkedin,
                    github
                }
                
            })
            setBio("")
            setGithub("")
            setLinkedin("")

            navigate("/profile", {replace: true});
            navigate(0);
        }catch (err){
            console.error(err)
        }
        
    };

    const handleChange = (event) => {
        
        let {name, value} = event.target;

        if (name === "bio"){
            setBio(value)
        }


        if (name === "github"){
            setGithub(value)
        }
        if(name === "linkedin"){
            setLinkedin(value)
        }
    };

    return(
        <div style={{justifyContent: "center"}}>
           <h2 style={{marginLeft: "10%", marginTop: "1%"}}>{`Now Editing ${user.username}'s Profile`} </h2>
    <div id="editProfileContainer">
    
            <div   class="ui form">
                <form id="editProfileForm" onSubmit={handleEditProfile}>

                    <div class="field" >
                        <label>LinkedIn</label>
                        <input  style={{width: "60vw"}}  id="linkedin" type="textarea" name="linkedin" onChange={handleChange} placeholder={user.linkedin} value={linkedin} rows="1"></input>
                    </div>

                    <div  class="field" >
                    <label>Github</label>
                    <input style={{width: "60vw"}} id="github" type="textarea" name="github" onChange={handleChange}  placeholder={user.github} value={github} rows="1"></input>
                    </div>

                    <div class="field" >
                    <label>Bio</label>
                    <input style={{width: "60vw"}}  id="bio" type="textarea" name="bio" onChange={handleChange} placeholder={user.bio} value={bio} ></input>                    
                    </div>

                    <button type="submit" class="ui submit button">Submit</button>
                </form>
            
            </div>
            </div>
        </div>
    )



    
}

export default EditProfileContent;