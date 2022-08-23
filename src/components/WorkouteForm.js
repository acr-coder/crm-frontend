import React, { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from "../hooks/useAuthContext";
//import axios from "axios";

const WorkouteForm = () => {
  const {dispatch} =  useWorkoutsContext()
  const { user } = useAuthContext()
  const [musteri, setMusteri] = useState("");
  const [islem, setIslem] = useState("");
  const [teslim_tarihi, setTeslim_tarihi] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([])

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user) {
      setError('You must be logged in')
      return
    }

    const workout = { musteri, islem, teslim_tarihi };

    const response = await fetch("/api/workouts",{
        method:'POST',
        body: JSON.stringify(workout),
        headers: {
          'Content-Type':'application/json',
          'Authorization':`Bearer ${user.token}`
        }

    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields)
    }

    if (response.ok) {
      setMusteri("");
      setIslem("");
      setTeslim_tarihi("");
      setError(null);
      setEmptyFields([])
      console.log("new workout added", json);
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Yeni İşlem Ekle</h3>

      <label>Müşteri:</label>
      <input
        type="text"
        onChange={(e) => setMusteri(e.target.value)}
        value={musteri}
        className={emptyFields.includes('musteri') ? 'error' : ''}
      />
      <label>İşlem:</label>
      <input
        type="text"
        onChange={(e) => setIslem(e.target.value)}
        value={islem}
        className={emptyFields.includes('islem') ? 'error' : ''}
      />
      <label>Teslim Tarihi:</label>
      <input
        type="date"
        onChange={(e) => setTeslim_tarihi(e.target.value)}
        value={teslim_tarihi}
        className={emptyFields.includes('teslim_tarihi') ? 'error' : ''}
      />

      <button>Ekle</button>
      {error && <div className="error">{error}</div> }
    </form>
  );
};

export default WorkouteForm;
