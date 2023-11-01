import { useState } from "react";

export const Register = (props) => {
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  function handleRegister(e) {
    e.preventDefault();
    console.log(inputs);
    props.toggle()
      fetch("https://cool-forest-6744.fly.dev/register",{
        method:'post',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(inputs)
      })
  }

  return (
    <div className="popup">
      <div className="popup">
        <h2>Register</h2>
        <br />
        <form className="popup">
          <label className="">
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
          <label>
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
        <button className="btn" type="submit" onClick={handleRegister}>
            Register
          </button>
          <br />
        <button className="btn" onClick={props.toggle}>
          Close
        </button>
        </form >
      </div>
    </div>
  );
}
