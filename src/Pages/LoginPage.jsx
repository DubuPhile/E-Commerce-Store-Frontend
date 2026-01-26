import { Link } from "react-router-dom";
import "../Styles/LoginPage.css";
import { useState, useRef, useEffect } from "react";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const userRef = useRef();
  const errorRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
  };

  return (
    <section className="login-page">
      <div className="ads-section">Hello</div>
      <div className="login-section">
        <h2>Log-in</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            placeholder="Username/Email"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            ref={userRef}
            required
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <div className="button">
            <button>Sign In</button>
            <Link to="#">Forgot Password?</Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
