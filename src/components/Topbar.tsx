import React,{useContext} from 'react';

function Topbar() {

const user = JSON.parse(localStorage.getItem('user'))
  
  return <div className="topbar-container">
    <div className='greeting'>
      Hello, {user.username}! 👋🏻
    </div>
    <div className='profile-setting'>
      Some button icon for profile setting
    </div>
  </div>;
}

export default Topbar;
