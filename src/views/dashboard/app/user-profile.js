import React from 'react'
import Agent from './Agent'
import Footballer from './Footballer'
import { useLocation, useNavigate } from 'react-router-dom'
import Admin from './Admin'

const UserProfile =() =>{
   const email=useLocation();
   if(email.state.user.userRole==="Admin"){
      return(Admin())
   }
   else if(email.state.user.userRole==="Footballer"){
      return(Footballer())
   }else if(email.state.user.userRole==="Agent"){
      return(Agent())
   }

}

export default UserProfile;