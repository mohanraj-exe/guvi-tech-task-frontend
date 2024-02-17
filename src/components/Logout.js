import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

  const getAccessToken = async () =>{
    await JSON.parse(localStorage.getItem("accessToken"));
    removeAccessToken();
  }

  const navigate = useNavigate(); 
  
  const removeAccessToken = async () =>{
    localStorage.removeItem("accessToken");
    alert("User logged out successfully")
    navigate('/')
  }

  return (
    <>
      <div className='logout'>
        <div className='container'>
          <button className="btn--class" onClick={() => getAccessToken()}>Logout</button>
        </div>
      </div>

    </>
  )
};

export default Logout;
