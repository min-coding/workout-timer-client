import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
  username: string;
}

function SignUp() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://workout-timer-server-production.up.railway.app/api/users/signup',
        {
          username: formData?.username,
          email: formData?.email,
          password: formData?.password,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        alert(res.data.message);
        navigate('/signin');
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
    <div className="signup-form page-container">
      <div className="signup-form form-picture-container"></div>
      <div className="signup-form form-container">
        <h1>Sign Up 🏆 </h1>
        <form className="signup-form form-layout" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            required={true}
            value={formData.username}
            onChange={handleChange}></input>
          <label>Email</label>
          <input
            type="email"
            name="email"
            required={true}
            value={formData.email}
            onChange={handleChange}></input>
          <label>Password</label>
          <input
            type="password"
            name="password"
            required={true}
            value={formData.password}
            onChange={handleChange}></input>
          <button className="signup-form form-button" type="submit">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
