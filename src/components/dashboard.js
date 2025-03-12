import React, { useState } from "react";

const Dashboard = ({ authStatus }) => {

    const[userDetails,setUserDetails] = useState({
        name:"",
        email:""
    })

    const getUserDetails=async()=>{
        try {
            const response = await fetch("http://localhost:8000/dashboard",{
                method:"GET",
                headers:{token:localStorage.token}
            })
            const data =await response.json()
            console.log(data)
            setUserDetails({
                name:data.user_name,
                email:data.user_email
            })
          
        } catch (error) {
            console.log(error)
        }
       

    }

    const onClick=()=>{
        authStatus(false)
    }

  return <div>
        <h1>Dashboard</h1>
        {userDetails.name+ userDetails.email}
        <button onClick={getUserDetails}>Get User Details</button>
        <button onClick={onClick}>logout</button>
  </div>;
};

export default Dashboard;
