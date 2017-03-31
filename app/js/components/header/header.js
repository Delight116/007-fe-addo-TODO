import React from 'react';
import ReactDOM from 'react-dom';

import ButtonArchive from './button_archive'
import Logo from './logo';
import Login from './login';


let Header = (props)=>{
    return(
      <nav>
        <Logo />
        <ButtonArchive />
        <Login />
      </nav>
    );
  }



export default Header;
