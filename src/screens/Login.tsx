import React from 'react';
import '../styles/Login.scss';
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Background } from '../components/Background';

export const Login = () => {
  return <main className="login-container">
    <Background />
    <div className="login-card">
      <h2 className="login-title">Log in to your account</h2>
      <form className="login-form" onSubmit={e => { e.preventDefault() }}>
        <div className="login-form-item">
          <FaEnvelope className="login-form-icon"/>
          <input className="login-form-input" type="text" placeholder="Email" />
        </div>
        <div className="login-form-item">
          <FaLock className="login-form-icon"/>
          <input className="login-form-input" type="password" placeholder="Password" />
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
      <p className="login-link">Don't have an account?
        <span><a href="/signup">Sign Up</a></span>
      </p>
    </div>
  </main>
};
