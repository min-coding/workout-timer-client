import React from 'react';
import { useNavigate } from 'react-router-dom';

function Topbar({
  setModalForm,
}: {
  setModalForm: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  return (
    <div className="topbar-container">
      <div className="greeting">
        <p>Hello, {user.username}! 👋🏻</p>
      </div>
      <div
        className="profile-setting"
        onClick={() => {
          setModalForm('editProfile');
          navigate(`/profile/${user.user_id}`);
        }}>
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.8495 30H8.24945C7.49945 30 6.74945 29.55 6.44945 28.95C5.99945 28.35 5.99945 27.75 6.29945 27C8.09945 22.8 12.1495 19.95 16.7995 19.95C21.4495 19.95 25.3495 16.05 25.3495 11.4C25.3495 6.75 21.4495 3 16.6495 3C11.9995 3 8.09945 6.9 8.09945 11.55C8.09945 14.25 9.29945 16.65 11.2495 18.15C7.79945 19.5 4.79945 22.35 3.29945 25.95C2.69945 27.45 2.84945 29.25 3.74945 30.6C4.79945 32.1 6.29945 33 8.09945 33H11.6995C12.5995 33 13.1995 32.4 13.1995 31.5C13.1995 30.6 12.7495 30 11.8495 30ZM11.0995 11.55C11.0995 8.55 13.6495 6 16.6495 6C19.6495 6 22.1995 8.55 22.1995 11.55C22.1995 14.55 19.6495 17.1 16.6495 17.1C13.6495 17.1 11.0995 14.55 11.0995 11.55Z"
            fill="black"
          />
          <path
            d="M31.7992 16.5C30.2992 15 27.7492 15 26.2492 16.5L18.2992 24.45C16.4992 26.25 15.4492 28.8 15.4492 31.5C15.4492 32.4 16.0492 33 16.9492 33C19.6492 33 22.0492 31.95 23.9992 30.15L31.9492 22.2C32.6992 21.45 33.1492 20.4 33.1492 19.35C33.1492 18.3 32.5492 17.25 31.7992 16.5ZM29.6992 20.1L21.7492 28.05C20.8492 28.95 19.7992 29.55 18.5992 29.85C18.8992 28.65 19.4992 27.6 20.3992 26.7L28.3492 18.75C28.4992 18.6 28.7992 18.45 29.0992 18.45C29.399ß2 18.45 29.5492 18.6 29.6992 18.75C29.8492 18.9 29.9992 19.2 29.9992 19.35C29.9992 19.5 29.8492 19.8 29.6992 20.1Z"
            fill="black"
          />
        </svg>
      </div>
    </div>
  );
}

export default Topbar;
