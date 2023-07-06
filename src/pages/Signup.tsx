import axios from 'axios';
import React, { useState, useContext } from 'react';
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
      const { data } = await axios.post(
        'https://localhost:8080/api/users/signup',
        {
          username: formData?.username,
          email: formData?.email,
          password: formData?.password,
        },
        { withCredentials: true }
      );
      if (data) {
        //alert data.message
        alert('Create user successful!');
        navigate('/signin');
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
    <div className="signup-form page-container">
      <div className="signup-form form-picture-container">
      </div>
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
