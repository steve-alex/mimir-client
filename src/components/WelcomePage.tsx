import axios from "axios";
import { useEffect, useState } from "react";
import Modal from 'react-modal';


export default function WelcomePage({ name, logout }: any) {
  const [availabilities, setAvailabilities] = useState([]);
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('00:00');


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

  return (
    <div className='welcome'>
      <h2> Settings <span>{name}</span></h2>
      <br></br>
      {availabilities.length > 0 ? availabilities.map((a) => AvailabilityItem(a, setAvailabilities)) : <p>"Loading availabilities..."</p>}
    </div> 
  )
}

const AvailabilityItem = (availability: any, setAvailabilities: any) => {
  const handleDelete = async (id: number): Promise<void> => {
    try {
      const response = await axios.delete(`http://localhost:3000/availability/${id}`);
      if (response.status === 204) {
        setAvailabilities((prevState: any) => prevState.filter((a: any) => a.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdate = async (id: number, data: any): Promise<void> => {
    try {
      const response = await axios.put(`http://localhost:3000/availability/${id}`, data);
      const updatedAvailability = response.data;
      setAvailabilities((prevState: any) => prevState.map((a: any) => {
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
    <div key={availability.id}>
      <div>
        <label>Day of week: {availability.dayOfWeek}</label>
        <br></br>
        <label>Start time: {availability.startTime}</label>
        <label>End time: {availability.endTime}</label>
        <button onClick={() => handleDelete(availability.id)}>Delete</button>
        {/* <button onClick={() => handleUpdate(availability.id)}>Update</button> */}
        <br></br>
      </div>
    </div>
  );
}

function UpdateModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Modal Title</h2>
        <p>Modal content goes here</p>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
  );
}
  // useEffect(() => {
  //   setDayOfWeek(availability.dayOfWeek);
  // }, [])



  // const handleUpdate1 = async (id: number, data: any) => {
  //   try {
  //     const response = await axios.put(`http://localhost:3000/availability/${id}`, data);
  //     const updatedAvailability = response.data;
  //     setAvailabilities(prevState => prevState.map(a => {
  //       if (a.id === updatedAvailability.id) {
  //         return updatedAvailability;
  //       } else {
  //         return a;
  //       }
  //     }));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const parseTime = (time: string | null): string | null =>  {
  //   if (!time) return null;
    
  //   const [hour, minutes, secondss] = time.split(':');
  //   return `${hour}:${minutes}`;
  // }

  // const handleUpdate = async (id: any) => {
  //   try {
  //     const data = {
  //       dayOfWeek,
  //       start_time: startTime,
  //       end_time: endTime,
  //     };
  //     const response = await axios.put(`/api/availabilities/${id}`, data);
  //     const updatedAvailability = response.data;
  //     onUpdate(updatedAvailability);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
