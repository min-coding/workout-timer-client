import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
}

function SigninForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })
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
        navigate('/plan')
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
      <form onSubmit={handleSubmit}>
        <label>email</label>
        <input
          // type="email"
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
        <button type="submit">Sign in</button>
      </form>
    </>
  );
}

export default SigninForm;
