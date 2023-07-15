import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoutIcon from '../assets/logout-svgrepo-com.svg';
import editProfileIcon from '../assets/edit-profile.svg';
import axios from 'axios';

function Topbar({
  setModalForm,
}: {
  setModalForm: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  async function logOut() {
    try {
      const res = await axios.post('https://localhost:8080/api/users/signout', {
        withCredentials: true,
      });
      if (res.status === 200) {
        alert(res.data);
        localStorage.clear();
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="topbar-container">
      <div className="topbar-greeting">
        <p>Hello, {user.username}! 👋🏻</p>
      </div>
      <div className="topbar-user">
        <div
          className="topbar-profile-setting"
          onClick={() => {
            setModalForm('editProfile');
            navigate(`/profile/${user.user_id}`);
          }}>
          <img src={editProfileIcon} alt="edit profile" />
        </div>
        <div onClick={logOut} className="topbar-logout">
          <img src={logoutIcon} alt="logout" />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
