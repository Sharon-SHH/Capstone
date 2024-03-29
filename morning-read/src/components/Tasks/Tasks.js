import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Tasks.scss";
import taskIcon from "../../assets/images/Icons/task-icon.png";
import InputTask from "../InputTask/InputTask";
import ReservedTask from "../ReservedTask/ReservedTask";

const baseUrl = process.env.REACT_APP_SERVER_URL;
const Tasks = () => {
  const [taskList, setTaskList] = useState([]);
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [showInputItem, setShowInputItem] = useState(false);

  const handleAddEventClick = () => {
    setShowInputItem(!showInputItem);
  };

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
      setShowInputItem(false); 
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
    <div className="tasks">
      <div className="tasks__task">
        <h3>
          Add New Task{" "}
          <img
            className="tasks__inputTask"
            src={taskIcon}
            alt="taskIcon"
            onClick={handleAddEventClick}
          />
        </h3>
      </div>
      {showInputItem && <InputTask onSubmit={fetchData} />}

      <h3>Today's Reserved Tasks</h3>
      <label>
        <input
          type="checkbox"
          className="tasks__check"
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
