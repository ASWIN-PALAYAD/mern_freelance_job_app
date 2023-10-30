import React, { useState } from 'react';
import './Login.scss';
import newRequest from '../../utils/newRequest';
import {useNavigate} from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        const res = await newRequest.post('/auth/login', { username,password});
        localStorage.setItem('currentUser', JSON.stringify(res.data));
        navigate('/');
        console.log(res.data);
      } catch (error) {
        setError(error.response.data);
      }
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
      {error && error}

        <h1>Sign in</h1>
        <label htmlFor="">User name</label>
        <input type="text" name='username' value={username} placeholder='Enter your username' onChange={e=>setUsername(e.target.value)} />

        <label htmlFor="">Password</label>
        <input type="password" name='password' value={password} placeholder='Enter your password' onChange={e=>setPassword(e.target.value)} />

        <button type='submit' >Login</button>
      </form>
    </div>
  )
}

export default Login