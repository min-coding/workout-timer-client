import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface FormData {
  workout_name: string;
  duration: number;
}

function CreateWorkout({
  setModalForm,
}: {
  setModalForm: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [formData, setFormData] = useState<FormData>({
    workout_name: '',
    duration: 0,
  });
  const { routineId } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://workout-timer-server-production.up.railway.app/api/workouts/${routineId}`,
        {
          workout_name: formData?.workout_name,
          duration: formData?.duration * 10,
        },
        { withCredentials: true }
      );
      if (data) {
        alert('create workout sucessful!');
        setModalForm(null);
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
      <form className="workout-form" onSubmit={handleSubmit}>
        <label>Workout Name</label>
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
