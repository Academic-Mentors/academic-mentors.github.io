import React from 'react';
import { useNavigate } from 'react-router-dom'

import './NavBar.css'

const NavBar= () =>{

  const navigate = useNavigate();

  return (
    <div className='back-button' onClick={() => {
        navigate(-1)
    }}>Go Back To Landing Page</div>
  );
}
export default NavBar;