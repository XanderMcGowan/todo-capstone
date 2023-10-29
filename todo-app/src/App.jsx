import { useState } from 'react'

import { CustomForm } from './components/CustomForm';
import { EditForm }from './components/EditForm'
import  { TaskList } from './components/TaskList'
import { Login } from './components/Login';




function App() {
  const [tasks, setTasks] = useState([]);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [seen, setSeen] = useState(false)
  const [visible, setVisible] = useState(true);
  const [username, setUserName] = useState("")

  const declareUserName = (username) => {
    setUserName(username)
  }

  const addTask = (task) => {
    setTasks(prevState => [...prevState, task])
  }

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(t => t.id !== id));
    fetch("http://localhost:3306/todos/"+id,{
      method:'DELETE'
    })
  }

  const toggleTask = (id) => {
    setTasks(prevState => prevState.map(t => (
      t.id === id
        ? { ...t, checked: !t.checked }
        : t
    )))
  }

  const updateTask = (task) => {
    setTasks(prevState => prevState.map(t => (
      t.id === task.id
        ? { ...t, name: task.name }
        : t
    )))
    let inputs = {
      name: task.name

    }
    console.log(inputs)
    fetch("http://localhost:3306/todos/"+task.id,{
      method:'post',
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(inputs)
    })
    closeEditMode();
  }

  const closeEditMode = () => {
    setIsEditing(false);
    previousFocusEl.focus();
  }

  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement);
  }

  const removeElement = () => {
    setVisible((prev) => !prev);
    setSeen(!seen);
  };

  function togglePop () {
    setSeen(!seen);

};

async function getData (username){

  const url = "http://localhost:3306/todos/" + username

  const response = await fetch(url) 

  const data = await response.json() 
  setTasks(...tasks, data)
  console.log("todos are ready")

}


  return (
    <div className="container">
      <header>
        <h1>My Task List</h1>
      </header>

      <div>
            {visible && (
              <div>
                <h1>Login to save your todos</h1>
                <button className='btn' onClick={removeElement}>Login</button>
              </div>
             )} 
            {seen ? <Login 
            declareUserName={declareUserName}
            getData={getData}
            toggle={togglePop} /> : null}
        </div>
      
      <CustomForm 
      username={username}
      addTask={addTask}/>
      {
        isEditing && (
          <EditForm
            editedTask={editedTask}
            updateTask={updateTask}
            closeEditMode={closeEditMode}
          />
        )
      }
      {tasks && (
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      )}

    </div>
  )
}

export default App