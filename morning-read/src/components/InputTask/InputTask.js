import axios from "axios";
import React, { useState } from "react";
import {isValidateTask} from "../../commonFun/utils";
const baseUrl = process.env.REACT_APP_SERVER_URL;

const InputTask = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    note: "",
    startDate: "",
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const inputObj = {
      title: formData.title,
      note: formData.note,
      status: false,
      start_date: formData.startDate,
      end_date: formData.deadline,
    };
    if (!isValidateTask(inputObj)) {
      alert("Please fill in all fields correctly.");
      return;
    }
    try {
      await axios.post(`${baseUrl}/tasks`, inputObj);
      alert("Your Update was successful!");
      setFormData({
        title: "",
        note: "",
        startDate: "",
        deadline: "",
      });
      onSubmit();
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  return (
    <div>
      <h3>New Event</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">
            Title<span>*</span>:
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="note">Note:</label>
          <textarea name="note" value={formData.note} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="startDate">
            Start Date<span>*</span>:
          </label>
          <input
            type="datetime-local"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="deadline">
            Deadline<span>*</span>:
          </label>
          <input
            type="datetime-local"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InputTask;