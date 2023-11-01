import { useState } from 'react'

import { CustomForm } from './components/CustomForm';
import { EditForm }from './components/EditForm'
import  { TaskList } from './components/TaskList'
import { Login } from './components/Login';
import { Register } from './components/Register';




function App() {
  const [tasks, setTasks] = useState([]);
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [seen, setSeen] = useState(false)
  const [formSeen, setFormSeen] = useState(false)
  const [regSeen, setRegSeen] = useState(false)
  const [visible, setVisible] = useState(true);
  const [regVisible, setRegVisible] = useState(true);
  const [username, setUserName] = useState("")

  const declareUserName = (username) => {
    setUserName(username)
  }

  const addTask = (task) => {
    setTasks(prevState => [...prevState, task])
  }

  const deleteTask = (id) => {
    setTasks(prevState => prevState.filter(t => t.id !== id));
    fetch("https://cool-forest-6744.fly.dev/todos/"+id,{
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
    fetch("https://cool-forest-6744.fly.dev/todos/"+task.id,{
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

  const regRemoveElement = () => {
    setRegVisible((prev) => !prev);
    setRegSeen(!regSeen);
  };

  const regRemoveElementLogin = () => {
    setRegVisible((prev) => !prev);
  };


  function togglePop () {
    setSeen(!seen);

};

function regTogglePop () {
  setRegSeen(!regSeen);

};

function displayForm () {
  setFormSeen(!formSeen);

};

async function getData (username){

  const url = "https://cool-forest-6744.fly.dev/todos/" + username

  const response = await fetch(url) 

  const data = await response.json() 
  setTasks(...tasks, data)
  console.log("todos are ready")

}


  return (
    <div className="container">
      <header className='popup'>
        <h1>My Task List</h1>
        <button className='btn' type='submit' onClick={() => window.location.reload()}>Logout</button>
      </header>
      <div>
            {regVisible && (
              <div className='popup'>
                <h2>Register here first</h2>
                <br />
                <button className='btn' onClick={regRemoveElement}>Register</button>
              </div>
             )} 
            {regSeen ? <Register
            toggle={regTogglePop} /> : null}
        </div>

      <div>
            {visible && (
              <div className='popup'>
                <h2>Login to save your todos</h2>
                <br />
                <button className='btn' onClick={removeElement}>Login</button>
              </div>
             )} 
            {seen ? <Login 
            displayForm={displayForm}
            declareUserName={declareUserName}
            getData={getData}
            regRemoveElementLogin={regRemoveElementLogin}
            toggle={togglePop} /> : null}
        </div>
      
      {formSeen ?
        <CustomForm 
      username={username}
      addTask={addTask}/> : null
        }
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