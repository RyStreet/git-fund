import React, {useState} from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { EDIT_PROFILE } from "../utils/mutations";

import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "../utils/queries"

import Auth from "../utils/auth"

//create and edit linkedin
//create and edit github
//create and edit bio
//edit email

function EditProfileContent () {
    // const navigate = useNavigate()

    const [bio, setBio] = useState('')
    const [linkedin, setLinkedin] = useState('')
    const [github, setGithub] = useState('')
    const [editProfile, {error}] = useMutation(EDIT_PROFILE)

    const { username: userParam} = useParams()
    

    const {loading, data} = useQuery(userParam? QUERY_USER: QUERY_ME, {
        variables: {username: userParam}
    });
    const user = data?.me || []

    

    const handleEditProfile = async(bio, linkedin, github) => {
        console.log("hit")
        console.log(user)
        try{
            const {data} = await editProfile({
                variables:{
                    userId: user._id,
                    bio,
                    linkedin,
                    github
                }
                
            })
            setBio("")
            setGithub("")
            setLinkedin("")
        }catch (err){
            console.error(err)
        }
        alert("wait")
        
    };

    const handleChange = (event) => {
        let {name, value} = event.target;

        if (name="bio"){
            setBio(value)
        }
        if (name="github"){
            setGithub(value)
        }
        if(name = "linkedin"){
            setLinkedin(value)
        }
    };

    return(
        <div>
            <h2>{`Now Editing ${user.username}'s Profile`} </h2>
    
    <div class="ui form">
        <form onSubmit={handleEditProfile}>

            <div  class="field" >
                <label>LinkedIn</label>
                <input type="textarea" name="linkedin" onChange={handleChange} value={linkedin} rows="1"></input>
            </div>

        {/* <div onChange={handleChange} class="field" name="github">
        <label>Github</label>
        <textarea rows="1"></textarea>
        </div>

        <div onChange={handleChange} class="field" name="bio">
        <label>Bio</label>
        <textarea></textarea>
        </div> */}

        <button type="submit" class="ui submit button">Submit</button>
        </form>
     
    </div>
        </div>
    )



    
}

export default EditProfileContent;