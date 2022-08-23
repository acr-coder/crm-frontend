import React from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from '../hooks/useAuthContext'
import { format, formatDistanceToNow} from 'date-fns'
import { tr } from 'date-fns/locale'
import {AiFillDelete} from "react-icons/ai"

const WorkoutDetails = ({workout}) => {

  const {dispatch} =  useWorkoutsContext()
  const { user } = useAuthContext()
  
  const handleClick = async () => {
    if(!user){
      return
    }
    const response = await fetch('/api/workouts/'+ workout._id,{
      method:'DELETE',
      headers:{
        'Authorization':`Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if(response.ok){
      dispatch({type: 'DELETE_WORKOUT', payload:json})
    }
  }

  const sure = formatDistanceToNow(new Date(workout.teslim_tarihi), { locale:tr})

  
  return (
    <div className="workout-details">
        <h4>{workout.musteri}</h4>
        <p><strong>İşlem:</strong>{workout.islem}</p>
        <p><strong>Başvuru Tarihi:</strong>{format(new Date(workout.createdAt), 'dd/MM/yyyy', { locale:tr})}</p>             
        <span className={sure.split(" ")[0] < 3 | sure.split(" ")[0] == 'yaklaşık' ? 'kalan_sure' : ''} >{sure}</span> 
        <p><strong>Teslim Tarihi:</strong>{format(new Date(workout.teslim_tarihi), 'dd/MM/yyyy', { locale:tr})}</p>   
        <span className='delete' onClick={handleClick} ><AiFillDelete fontSize={30} /></span>
    </div>
  )
}

export default WorkoutDetails