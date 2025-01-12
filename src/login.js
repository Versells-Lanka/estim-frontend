import React, { useState, useRef } from 'react';
import { SlLock } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage.js";
import SuccessMessage from "./SuccessMessage.js";


function Login() {
  const [code, setCode] = useState(['', '', '', '']);
  const [displayCode, setDisplayCode] = useState(['', '', '', '']);
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [smessage, setSMessage] = useState(null);
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const newCode = [...code];
    const newDisplayCode = [...displayCode];
    const value = e.target.value.slice(0, 1);

    newCode[index] = value;
    setCode(newCode);
    
    if (value !== '') {
      newDisplayCode[index] = value;
      setDisplayCode(newDisplayCode);

      setTimeout(() => {
        const maskedDisplayCode = [...displayCode];
        maskedDisplayCode[index] = '*';
        setDisplayCode(maskedDisplayCode);
      }, 300);
      
      if (index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newCode = [...code];
      const newDisplayCode = [...displayCode];
      if (newCode[index] === '' && index > 0) {
        inputRefs.current[index - 1].focus();
        newCode[index - 1] = '';
        newDisplayCode[index - 1] = '';
      } else {
        newCode[index] = '';
        newDisplayCode[index] = '';
      }
      setCode(newCode);
      setDisplayCode(newDisplayCode);
    }
  };

  const handleSubmit = () => {
    const hardcodedPassword = "0527";
    if (code.join('') === hardcodedPassword) {
      navigate("/home");
    } else {
      setMessage('Incorrect Password');
      setTimeout(() => {
        setMessage(null);
      }, 1000);
    }
  };

  return (
    
    <div className='login-window'>
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      {smessage && (
        <SuccessMessage variant="success">{smessage}</SuccessMessage>
      )}
      <div className='system-name'>Estimate System</div>
      <div className='lock-container'>
        <div className='lock-icon'><SlLock /></div>
        Enter your password to access the admin.
      
      <div className='input-container'>
        {displayCode.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type='text'
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength='1'
            className='digit-input'
          />
        ))}
      </div>
      <button className='submit-btn' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Login;
