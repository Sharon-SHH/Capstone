import React, {useState} from "react";
import axios from "axios";
import "./ReservedTask.scss";
import { HumanReadableDate, computeDaysPassed } from "../../commonFun/utils"; 

const baseUrl = process.env.REACT_APP_SERVER_URL;
const ReservedTask = ({ reservedTask }) => {
    const [isDone, setIsDone] = useState(false);
    const handleCheck = async ()=> {
        setIsDone(!isDone);
        try {
            await axios.put(`${baseUrl}/tasks/${reservedTask.id}`, {
              status: true,
            });
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }
  return (
    <div className="reservedTasks">
      {!isDone && (
        <div className="reservedTasks__card">
          <div className="reservedTasks__wrapper">
            <h4>{reservedTask.title}</h4>
            <input type="checkbox" checked={isDone} onChange={handleCheck} />
          </div>
          <p>{reservedTask.note}</p>
          <div className="reservedTasks__content">
            <p>
              Ongoing day(s):{" "}
              <span className="details">
                {computeDaysPassed(reservedTask.start_date) >= 0
                  ? computeDaysPassed(reservedTask.start_date)
                  : `coming in ${-computeDaysPassed(
                      reservedTask.start_date
                    )} days`}
              </span>
            </p>
            <p>
              Deadline:{" "}
              <span className="details">
                {HumanReadableDate(reservedTask.end_date)}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservedTask;