import axios from 'axios';
import React, { useState } from 'react';
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
      const res = await axios.post<FormData>(
        'https://workout-timer-server-production.up.railway.app/api/users/signin',
        {
          email: formData?.email,
          password: formData?.password,
        },
        { withCredentials: true }
      );
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem('user', JSON.stringify(res.data));
        navigate('/plan');
      }
    } catch (error: any) {
      if (error.response.status === 403) alert(error.response.data);
      else alert('Server failed to respond');
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
        <h2>Sign In ⏱</h2>
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
