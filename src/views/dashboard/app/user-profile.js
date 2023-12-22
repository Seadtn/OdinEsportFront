
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Admin from './Admin'
import Agent from './Agent'
import Footballer from './Footballer'

const UserProfile =() =>{
   const { isLoggedIn, data } = useSelector((state) => state.data.user);
   const email=useLocation();
   if(email.state.user.userRole==="Admin"){
      return(Admin())
   }
   else if(email.state.user.userRole==="Footballer" ){
      return(Footballer())
   }else if(email.state.user.userRole==="Agent"){
      return(Agent())
   }

}

export default UserProfile;