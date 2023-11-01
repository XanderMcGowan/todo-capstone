import { useState } from 'react'

import styles from './TaskItem.module.css'

import { CheckIcon } from '@heroicons/react/24/outline'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/outline'

export const TaskItem = ({task, deleteTask, toggleTask, enterEditMode}) => {
const [isChecked, setIsChecked] = useState(task.checked)

const handleCheckboxChange = (e) => {
  setIsChecked(!isChecked)
  toggleTask(task.id)
updateChecked()
}

const updateChecked = () => {
  let inputs = {
    checked: !isChecked
  }
  console.log(inputs)
  fetch("https://cool-forest-6744.fly.dev/todos/"+task.id,{
    method:'put',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(inputs)
  })
}

  return (
<li
className={styles.tasks}>
  <div className={styles["task-group"]}>
    <input 
    type="checkbox" 
    
    className={styles.checkbox}
    checked={isChecked}
    onChange={handleCheckboxChange}
    name={task.name}
    id={task.id}
    
    />
    <label 
    htmlFor={task.id}
    className={styles.label}
    >
      {task.name}
      <p className={styles.checkmark}>
        <CheckIcon/>
      </p>
    </label>
  </div>
<div className={styles["task-group"]}>
  <button 
  className='btn'
  aria-lable={`Update ${task.name} Task`}
  onClick={()=> enterEditMode(task)}
  
  
  >
    <PencilSquareIcon />
  </button>
  <button
          className={`btn ${styles.delete}`}
          aria-label={`Delete ${task.name} Task`}
          onClick={()=> deleteTask(task.id)}
        >
          <TrashIcon  />
        </button>
</div>
</li>
  )
}
