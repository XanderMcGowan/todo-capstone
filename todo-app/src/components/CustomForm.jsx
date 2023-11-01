import { useState, useId } from "react";

import { PlusIcon } from "@heroicons/react/24/solid";

export const CustomForm = ({ addTask, username }) => {
  const [task, setTask] = useState("");

  const handleFormSubmit = (e) => {
   let min = Math.ceil(1);
    let max = Math.floor(100000);
    e.preventDefault();
    let inputs = {
      username:username,
      name: task,
      checked: false,
      id: Math.floor(Math.random() * (max - min + 1)) + min
      
    }
    addTask(inputs)
    setTask("")
    fetch("https://cool-forest-6744.fly.dev/todos",{
        method:'post',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(inputs)
      })
  };

  return (
    <form 
    className="todo" 
    onSubmit={handleFormSubmit}>
      <div className="wrapper">
        <input
          type="text"
          id="task"
          className="input"
          value={task}
          onInput={(e)=>setTask(e.target.value)}
          required
          autoFocus
          maxLength={60}
          placeholder="Enter Task"
        />
        <label htmlFor="task" className="label">
          Enter Task
        </label>
      </div>
      <button className="btn" aria-label="Add Task" type="submit">
        <PlusIcon />
      </button>
    </form>
  );
};
