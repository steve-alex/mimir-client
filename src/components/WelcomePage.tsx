import axios from "axios";
import { useEffect, useState } from "react";

export default function WelcomePage({ name, logout }: any) {
  const [availabilities, setAvailabilities] = useState([{ id: 0, dayOfWeek: null, startTime: null, endTime: null }]);

  useEffect(() => {
    async function fetchAvailabilities() {
      try {
        const response = await axios.get('http://localhost:3000/availability');
        console.log("🚀 ~ file: WelcomePage.tsx:11 ~ fetchAvailabilities ~ response:", response.data.data)
        setAvailabilities(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchAvailabilities()
  }, [])

  const parseTime = (time: string | null): string | null =>  {
    if (!time) return null;
    
    const [hour, minutes, secondss] = time.split(':');
    return `${hour}:${minutes}`;
  }
  
  const handleDelete = async (id: number): Promise<void> => {
    console.log("🚀 ~ file: WelcomePage.tsx:29 ~ handleDelete ~ id:", id)
    try {
      const response = await axios.delete(`http://localhost:3000/availability/${id}`);
      if (response.status === 204) {
        setAvailabilities(prevState => prevState.filter(a => a.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdate = async (id: number, data: any) => {
    try {
      const response = await axios.put(`http://localhost:3000/availability/${id}`, data);
      const updatedAvailability = response.data;
      setAvailabilities(prevState => prevState.map(a => {
        if (a.id === updatedAvailability.id) {
          return updatedAvailability;
        } else {
          return a;
        }
      }));
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='welcome'>
      <h2> Settings <span>{name}</span></h2>
      <br></br>
      {availabilities.map((a) => (
        <li key={a.id}>
          {a.dayOfWeek} ({a.startTime} - {a.endTime})
          <button onClick={() => handleDelete(a.id)}>Delete</button>
          <button onClick={() => handleUpdate(a.id, { day_of_week: 'Friday' })}>Update</button>
        </li>
      ))}
    </div> 
  )
}