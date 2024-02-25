import React, { useEffect, useState } from "react";
import InputTask from "../InputTask/InputTask";
import axios from "axios";
import ReservedTask from "../ReservedTask/ReservedTask";

const baseUrl = process.env.REACT_APP_SERVER_URL;
const Tasks = () => {
  const [taskList, setTaskList] = useState([]);
  const [showAllTasks, setShowAllTasks] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/tasks`);
      const tmpList = response.data;
      // sort the list based on end_date
      const reservedTasks = tmpList.sort((firstItem, secondItem) => {
        const deadlineA = new Date(firstItem.end_date);
        const deadlineB = new Date(secondItem.end_date);
        return deadlineA - deadlineB;
      });
      const currentDayTasks = showAllTasks ? reservedTasks : reservedTasks.filter(task => {
        const today = new Date();
        const start_date = new Date(task.start_date);
        return ((
            start_date.getFullYear() === today.getFullYear() && 
            start_date.getMonth() === today.getMonth() && 
            start_date.getDate() === today.getDate()) || (!task.status && (start_date < today)));
      })
      setTaskList(currentDayTasks);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };
  const handleCheckboxChange = (e) => {
    setShowAllTasks((setShowAllTasks) => !setShowAllTasks);
  }
  useEffect(() => {
    // read reserved task from db
    fetchData();
  }, [showAllTasks]);
  return (
    <div>
      <InputTask onSubmit={fetchData} />
      <label>
        <input
          type="checkbox"
          checked={showAllTasks}
          onChange={handleCheckboxChange}
        />
        Show all tasks
      </label>
      {taskList && taskList.length > 0 ? (
        taskList.map((task, index) => (
          <ReservedTask key={index} reservedTask={task} />
        ))
      ) : (
        <p>No ReservedTask</p>
      )}
    </div>
  );
};

export default Tasks;
