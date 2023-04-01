import axios from "axios";
import { useEffect, useState } from "react";

interface Availability {
  id?: number;
  accountId: number;
  dayOfWeek: number | string;
  startTime: string;
  endTime: string;
  deleted: boolean;
  created_date: Date;
  updated_date: Date;
}
interface CreateAvailabilityModalProps {
  setAvailabilities: React.Dispatch<React.SetStateAction<Availability[]>>;
}

const mapDayOfWeekToNumber = (dayOfWeek: string): number => {
  switch (dayOfWeek) {
    case 'Monday':
      return 1;
    case 'Tuesday':
      return 2;
    case 'Wednesday':
      return 3;
    case 'Thursday':
      return 4;
    case 'Friday':
      return 5;
    case 'Saturday':
      return 6;
    case 'Sunday':
      return 7;
    default:
      throw new Error(`Invalid day of week: ${dayOfWeek}`);
  }
}

const CreateAvailabilityModal = ({ setAvailabilities }: any) => {
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleCreate = async (): Promise<void> => {
    try {
      const newAvailability: Availability = {
        accountId: 1, // Replace with the account ID of the user
        dayOfWeek: mapDayOfWeekToNumber(dayOfWeek),
        startTime,
        endTime,
        deleted: false,
        created_date: new Date(),
        updated_date: new Date(),
      };
      const response = await axios.post('http://localhost:3000/availability', newAvailability);

      const createdAvailability = Object.assign(
        newAvailability,
        { id: response.data.data.id },
        { dayOfWeek }
      );
      setAvailabilities((prevState: any) => [...prevState, createdAvailability]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <label>Day of week:</label>
      <select value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)}>
        <option value='Monday'>Monday</option>
        <option value='Tuesday'>Tuesday</option>
        <option value='Wednesday'>Wednesday</option>
        <option value='Thursday'>Thursday</option>
        <option value='Friday'>Friday</option>
        <option value='Saturday'>Saturday</option>
        <option value='Sunday'>Sunday</option>
      </select>
      <br />
      <label>Start time:</label>
      <input type='time' value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      <br />
      <label>End time:</label>
      <input type='time' value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      <br />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

export default function WelcomePage({ name, logout }: any) {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [showModal, setShowModal] = useState(false);

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
      <br />
      <button onClick={() => setShowModal(true)}>Add Availability</button>
      {showModal && <CreateAvailabilityModal setAvailabilities={setAvailabilities} setShowModal={setShowModal} />}
      <br />
      {availabilities.length > 0 ? availabilities.map((a: Availability) => (
        <AvailabilityItem key={a.id} availability={a} setAvailabilities={setAvailabilities} />
      )) : <p>"Loading availabilities..."</p>}
      <br />
      <button onClick={logout}>Logout</button>
    </div>
  )
}

const AvailabilityItem = ({ availability, setAvailabilities }: any) => {
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
        <br></br>
      </div>
    </div>
  );
}

