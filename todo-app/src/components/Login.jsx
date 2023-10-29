import { useState } from "react";

export const Login = (props) => {
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  function handleLogin(e) {
    e.preventDefault();
    console.log(inputs);
    props.toggle()
      fetch("http://localhost:3306/login",{
        method:'post',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(inputs)
      }).then(props.getData(inputs.username))
      .then(props.declareUserName(inputs.username))
  }

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label className="">
            Username:
            <input
        type="text" 
        name="username" 
        value={inputs.username} 
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
          type="text" 
          name="password" 
          value={inputs.password} 
              onChange={handleChange}
            />
          </label>
          <button className="btn" type="submit">
            Login
          </button>
        </form>
        <button className="btn" onClick={props.toggle}>
          Close
        </button>
      </div>
    </div>
  );
};
