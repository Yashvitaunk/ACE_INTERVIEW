import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  RiMailLine,
  RiLockPasswordLine,
  RiEyeLine,
  RiEyeOffLine,
  RiSparklingLine,
} from "react-icons/ri";

import "../auth.form.scss";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();

  const { loading, handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await handleLogin({
      email,
      password,
    });

    if (success) {
      navigate("/");
    }
  };

  if (loading) {
    return (
      <main className="auth-page">
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main className="auth-page">

      {/* Brand Section */}
      <div className="brand-section">
        {/* <div className="brand-logo">
          <RiSparklingLine />
        </div> */}

        <h1 className="brand-title">
          Ace<span>Interview</span>
        </h1>

        <p className="brand-subtitle">
          Resume Analysis • ATS Optimization • AI Interview Prep
        </p>
      </div>

      {/* Login Card */}
      <div className="auth-form-container">
        <h2>Welcome Back</h2>

        <p className="welcome-text">
          Login to continue to your account
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>

            <div className="input-wrapper">
              <RiMailLine className="input-icon" />

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>

            <div className="input-wrapper">
              <RiLockPasswordLine className="input-icon" />

              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <RiEyeOffLine />
                ) : (
                  <RiEyeLine />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="button-primary_button"
          >
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;