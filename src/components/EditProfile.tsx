import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface FormData {
  username: string;
  password: string;
}

function EditProfile({
  setModalForm,
}: {
  setModalForm: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://workout-timer-server-production.up.railway.app/api/users/profile/${userId}`,
        {
          username: formData?.username,
          password: formData?.password,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        alert('Update profile sucessful!');
        localStorage.setItem('user', JSON.stringify(res.data));
        setModalForm(null);
        //update routine by navigate
        navigate(`/plan`);
      }
    } catch (error: any) {
      alert(error.response.data.error);
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
