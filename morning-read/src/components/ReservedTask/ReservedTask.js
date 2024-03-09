import React, {useState} from "react";
import axios from "axios";
import "./ReservedTask.scss";
import { HumanReadableDate, computeDaysPassed } from "../../commonFun/utils"; 

const baseUrl = process.env.REACT_APP_SERVER_URL;
const ReservedTask = ({ reservedTask }) => {
  const [isDone, setIsDone] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
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
  const currentDate = new Date();
  const endDate = new Date(reservedTask.end_date);
  let color = "#272794";
  if (endDate < currentDate) {
    color = "red";
  }
  const style = {
    color: color,
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div className="reservedTasks">
      {!isDone && (
        <div className="reservedTasks__card">
          <div className="reservedTasks__wrapper">
            <h4>{reservedTask.title}</h4>
            <label className="reservedTasks__done">
              <input type="checkbox" checked={isDone} onChange={handleCheck} />
              <span className="hovered" onClick={handleCheck}>
                Done
              </span>
            </label>
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
              <span style={style}>
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