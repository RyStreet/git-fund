import React, {useState} from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import { empty, useMutation } from "@apollo/client";
import { EDIT_PROFILE } from "../utils/mutations";

import { useQuery } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "../utils/queries"

import Auth from "../utils/auth"
import EditProfileComp from "../components/EditProfileComp";


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
            {Auth.loggedIn() ? (
                <EditProfileComp user={user}/>
            ) : (
                <h3>Login or sign up to edit your profile</h3>
            )}
        </div>
    ) 
}

export default EditProfileContent;