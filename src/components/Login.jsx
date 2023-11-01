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
      fetch("https://cool-forest-6744.fly.dev/login",{
        method:'post',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(inputs)
      }).then(props.getData(inputs.username))
      .then(props.declareUserName(inputs.username))
      .then(props.displayForm()).then(props.regRemoveElementLogin())
  }

  return (
    <div className="popup">
      <div className="popup">
        <h2>Login</h2>
        <br />
        <form className="popup" >
          <label >
            Username:
            <input
        type="text" 
        name="username" 
        required
        value={inputs.username} 
              onChange={handleChange}
            />
          </label>
          <br />
          <label >
            Password:
            <input 
          type="text" 
          name="password" 
          value={inputs.password} 
          required
              onChange={handleChange}
            />
          </label>
          <br />
        </form>
          <button className="btn" type="submit" onClick={handleLogin}>
            Login
          </button>
          <br />
        <button className="btn" onClick={props.toggle}>
          Close
        </button>
      </div>
    </div>
  );
}
