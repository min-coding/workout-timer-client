import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RoutineContext } from '../App';

interface FormData {
  workout_name: string;
  duration: number;
}

function EditWorkout({ setModalForm }) {
  const [formData, setFormData] = useState<FormData>({
    workout_name: '',
    duration: 0,
  });
  const { workoutId } = useParams();
  const navigate = useNavigate();
  const { routines, setRoutines } = useContext(RoutineContext);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://localhost:8080/api/workouts/${workoutId}`,
        {
          workout_name: formData?.workout_name,
          duration: formData?.duration,
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
            Edit Workout
          </button>
        </div>
      </form>
    </>
  );
}

export default EditWorkout;
