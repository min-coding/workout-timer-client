import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RoutineContext } from '../App';

interface FormData {
  username: string;
  password: string;
}

function EditProfile({ setModalForm }) {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://localhost:8080/api/users/profile/${userId}`,
        {
          username: formData?.username,
          password: formData?.password,
        },
        { withCredentials: true }
      );
      console.log(data);
      if (data) {
        alert('Update profile sucessful!');
        localStorage.setItem('user', JSON.stringify(data));
        setModalForm(null);
        //update routine by navigate
        navigate(`/plan`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <>
      <form className="profile-form" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="form-input"
          name="username"
          placeholder="Update your username"
          value={formData.username}
          onChange={handleChange}></input>
        <label>Password</label>
        <input
          className="form-input"
          type="text"
          name="password"
          value={formData.password}
          placeholder="Update your password"
          onChange={handleChange}></input>
        <div className="modal-btn-container">
          <button className="modal-submit-btn" type="submit">
            Save changes
          </button>
        </div>
      </form>
    </>
  );
}

export default EditProfile;
