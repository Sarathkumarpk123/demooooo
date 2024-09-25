import React, { useEffect, useState } from 'react';
import './LoginPopup.css';

const LoginPopup = ({ setShowLogin }) => {

  const [token,setToken]= useState("")
  
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    if (token) {
      console.log("Token successfully set:", token);  // Token will be logged here after state updates
    }
  }, [token]);  // This effect will run whenever `token` changes
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
  
    try {
      let response;
      if (currState === "Login") {
        // Login user
        response = await fetch('http://localhost:3000/login/userlogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            token:data.token
          }),
        });
      } else {
        // Sign up user
        response = await fetch('http://localhost:3000/usersignup/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
          }),
        });
      }
      
      const result = await response.json();
      // console.log("resultttttt",result); // Log the result to inspect the structure
  
      if (response.ok) {
        alert(`${currState} successful!`);
        // Adjust how you're accessing token
        setToken(result.token); // Access the token from the result
        console.log("result.token", result.token)
        localStorage.setItem("token", result.token); // Save token in localStorage
        
        setShowLogin(false); // Close the popup after successful login/signup
        setTimeout(() => {
          window.location.reload();
        }, 100);
      } else {
        alert(result.message || "An error occurred. Please try again.");
      }
     
    } catch (error) {
      console.error('Error:', error);
      alert("An error occurred. Please try again.");
    }
  };
  
 
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
       <button onClick={()=>setShowLogin(false)}>X</button>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
        </div>
        <div className='login-popup-inputs'>
          {currState === "Login" ? null : (
            <input
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type='text'
              placeholder='Your name'
              required
            />
          )}
          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type='email'
            placeholder='Your email'
            required
          />
          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type='password'
            placeholder='Password'
            required
          />
        </div>

        <div className='current-state-button'>
          <button type='submit'>
            {currState === "Sign Up" ? "Create account" : "Login"}
          </button>
        </div>

        <div className='login-popup-conditions'>
          <input type='checkbox' required />
          <p>
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new Account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an Account? <span onClick={() => setCurrState("Login")}>Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
