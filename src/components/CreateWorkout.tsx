import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface FormData {
  workout_name: string;
  duration: number;
}

function CreateWorkout() {
  const [formData, setFormData] = useState<FormData>({
    workout_name: '',
    duration: 0,
  });
  const { routineId } = useParams();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://localhost:8080/api/routines/${routineId}`,
        {
          workout_name: formData?.workout_name,
          duration: formData?.duration,
        },
        { withCredentials: true }
      );
      if (data) {
        alert('create workout sucessful!');
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
      <form className="workout-form" onSubmit={handleSubmit}>
        <label>Routine name</label>
        <input
          className="form-input"
          name="workout_name"
          placeholder="Ex. Plank"
          required={true}
          value={formData.workout_name}
          onChange={handleChange}></input>
        <label>Duration (seconds)</label>
        <input
          className="form-input"
          type="number"
          min="0"
          max="3600"
          name="duration"
          required={true}
          value={formData.duration}
          onChange={handleChange}></input>
        <div className="modal-btn-container">
          <button className="modal-submit-btn" type="submit">
            Create Workout
          </button>
        </div>
      </form>
    </>
  );
}

export default CreateWorkout;
