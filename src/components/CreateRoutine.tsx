import axios from 'axios';
import React, { useState } from 'react';

interface FormData {
  routine_name: string;
}

function CreateRoutine() {
  const [formData, setFormData] = useState<FormData>({
    routine_name: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'https://localhost:8080/api/routines',
        {
          routine_name: formData?.routine_name,
        },
        { withCredentials: true }
      );
      if (data) {
        alert('create routine sucessful!');
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
      <form className="routine-form" onSubmit={handleSubmit}>
        <label>Routine name</label>
        <input
          className="form-input"
          name="routine_name"
          placeholder="Ex.Upper body"
          required={true}
          value={formData.routine_name}
          onChange={handleChange}></input>
        <div className="modal-btn-container">
          <button className="modal-submit-btn" type="submit">
            Create routine
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateRoutine;
