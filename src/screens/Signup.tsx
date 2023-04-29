import React from 'react';
import '../styles/Signup.scss';
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Background } from '../components/Background';

export const Signup = () => {
  return <main className="signup-container">
    <Background />
    <div className="signup-card">
      <h2 className="signup-title">Create a new account</h2>
      <form className="signup-form">
        <div className="signup-form-item">
          <FaEnvelope className="signup-form-icon"/>
          <input className="signup-form-input" type="text" placeholder="Email" />
        </div>
        <div className="signup-form-item">
          <FaLock className="signup-form-icon"/>
          <input className="signup-form-input" type="password" placeholder="Password" />
        </div>
        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
      <p className="signup-link">Do you have an account?
        <span><a href="/login">Login</a></span>
      </p>
    </div>
  </main>
};
