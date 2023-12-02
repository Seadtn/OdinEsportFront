import React from 'react'
import Agent from './Agent'
import Footballer from './Footballer'
import { useLocation, useNavigate } from 'react-router-dom'

const UserProfile =() =>{
   const email=useLocation();
   let navigate=useNavigate();
   if(email.state.user.userRole==="Footballer"){
      return(Footballer())
   }else if(email.state.user.userRole==="Agent"){
      return(Agent())
   }else{
      navigate("/");
   }

}

export default UserProfile;