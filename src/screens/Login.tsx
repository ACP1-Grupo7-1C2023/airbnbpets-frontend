import React from 'react';
import '../styles/Login.scss';

export const Login = () => {
  return <main className="login-container">
    <div className="login-card">
      <h2 className="login-title">Log in to your account</h2>
      <form className="login-form">
        <div className="login-form-item">
          <input className="login-form-input" type="text" placeholder="Email" />
        </div>
        <div className="login-form-item">
          <input className="login-form-input" type="password" placeholder="Password" />
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
      <p className="login-link">Don't have an account?
        <span><a href="/signup">Sing Up</a></span>
      </p>
    </div>
  </main>
};
