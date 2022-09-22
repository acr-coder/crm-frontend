import { useEffect,useState } from "react";
import { Link } from 'react-router-dom'
import { useWorkoutsContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from '../hooks/useAuthContext'
import WorkoutDetails from "../components/WorkoutDetails";
import WorkouteForm from "../components/WorkouteForm";

const Home = () => {

  const [loading, setLoading ] = useState(false)
  
  const {workouts, dispatch} =  useWorkoutsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("https://customer-follow-system.herokuapp.com/api/workouts",{
        headers: {
          'Authorization':`Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({type:'SET_WORKOUTS', payload:json})
      }
    };

    if(user){
      fetchWorkouts();
    }
    
    
  },[dispatch,user]);

  if(!user) return <div>Loading...</div>

  

  return (
    <div className="home">
      
      <div className="workouts">
      
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout}  />
          ) )}
      </div>
      <WorkouteForm  />
    </div>
  );
};

export default Home;
