import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface FormData {
  workout_name: string;
  duration: number;
}

function EditWorkout({
  setModalForm,
}: {
  setModalForm: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [formData, setFormData] = useState<FormData>({
    workout_name: '',
    duration: 0,
  });
  const { workoutId } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://localhost:8080/api/workouts/${workoutId}`,
        {
          workout_name: formData?.workout_name,
          duration: formData?.duration * 10,
        },
        { withCredentials: true }
      );
      if (data) {
        alert('Edit workout sucessful!');
        setModalForm(null);
        //update workout by navigate
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
        <label>Routine name</label>
        <input
          className="form-input"
          name="workout_name"
          placeholder="Ex. Plank"
          value={formData.workout_name}
          onChange={handleChange}></input>
        <label>Duration (seconds)</label>
        <input
          className="form-input"
          type="number"
          min="0"
          max="3600"
          name="duration"
          value={formData.duration}
          onChange={handleChange}></input>
        <div className="modal-btn-container">
          <button className="modal-submit-btn" type="submit">
            Edit Workout
          </button>
        </div>
      </form>
    </>
  );
}

export default EditWorkout;
