import React, {useState} from "react";
import axios from "axios";
import { HumanReadableDate, computeDaysPassed } from "../../commonFun/utils"; 

const baseUrl = process.env.REACT_APP_SERVER_URL;
const ReservedTask = ({ reservedTask }) => {
    const [isDone, setIsDone] = useState(false);
    const handleCheck = async ()=> {
        setIsDone(!isDone);
        console.log(reservedTask);
        try {
            await axios.put(`${baseUrl}/tasks/${reservedTask.id}`, {
              status: true,
            });
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }
  return (
    <div>
      {!isDone && (
        <>
          <h3>{reservedTask.title}</h3>
          <input type="checkbox" checked={isDone} onChange={handleCheck} />
          <p>{reservedTask.note}</p>
          <p>
            Ongoing day(s):{" "}
            {computeDaysPassed(reservedTask.start_date) >= 0
              ? computeDaysPassed(reservedTask.start_date)
              : `coming in ${-computeDaysPassed(reservedTask.start_date)} days`}
          </p>
          <p>Deadline: {HumanReadableDate(reservedTask.end_date)}</p>
        </>
      )}
    </div>
  );
};

export default ReservedTask;