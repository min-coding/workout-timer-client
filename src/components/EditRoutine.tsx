import axios from 'axios';
import React, { useState, useContext } from 'react';
import { RoutineContext } from '../App';
import { useNavigate, useParams } from 'react-router-dom';

interface FormData {
  routine_name: string;
}

function EditRoutine({ setModalForm }) {
  const [formData, setFormData] = useState<FormData>({
    routine_name: '',
  });
  const { routines, setRoutines } = useContext(RoutineContext);
  const navigate = useNavigate();
  const { routineId } = useParams();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://localhost:8080/api/routines/${routineId}`,
        {
          routine_name: formData?.routine_name,
        },
        { withCredentials: true }
      );
      if (data) {
        alert('Edit routine sucessful!');
      }
      setModalForm(null);
      //update routine by navigate
      navigate(`/plan/`);
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
            Edit routine name
          </button>
        </div>
      </form>
    </>
  );
}

export default EditRoutine;
