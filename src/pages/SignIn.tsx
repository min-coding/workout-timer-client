import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
}

function SignIn() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'https://localhost:8080/api/users/signin',
        {
          email: formData?.email,
          password: formData?.password,
        },
        { withCredentials: true }
      );
      if (data) {
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/plan');
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
    <div className="signin page-container">
      <div className="signin form-picture-container">
        <div className="signin title">
          <p>My Interval</p>
        </div>
        <div className="signin welcome-text">
          <div className="signin header">
            <h1>
              New Member?<br></br>
              <span className="signin header text">Join the club.</span>
            </h1>
          </div>
          <div className="signin subheader">
            <h4>Sign up now and design your own interval workout!</h4>
          </div>
          <div className="signin button-container">
            <Link to={'/signup'}>
              <button className="signin button-link">
                Click here to sign up!
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="signin form-container">
        <h1>Sign In ⏱</h1>
        <form className="signin form-layout" onSubmit={handleSubmit}>
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
          <button className="signin form-button" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
