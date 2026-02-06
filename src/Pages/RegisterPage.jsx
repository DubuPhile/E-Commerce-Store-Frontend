import "../Styles/RegisterPage.css";
import { useState, useEffect } from "react";
import { useRegisterMutation } from "../features/auth/authApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../Context/ToastContext";
const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [register, { isLoading, isError, isSuccess }] = useRegisterMutation();
  const { triggerToast } = useToast();

  const [error, setError] = useState("");
  const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
  const PWD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isMatch = confirmPassword.length > 0 && password === confirmPassword;

  useEffect(() => {
    if (password !== confirmPassword) {
      setError("Password do not match!");
    } else {
      setError("");
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (isError && error) {
      triggerToast(error, "error");
    }
    if (isSuccess) {
      triggerToast("Register Successfully!", "success");
    }
  }, [isError, error, triggerToast, isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!USER_REGEX.test(username)) {
      setError("Invalid username!");
    } else if (!EMAIL_REGEX.test(email)) {
      setError("Invalid email!");
    } else if (!PWD_REGEX.test(password)) {
      setError("Invalid password!");
    } else if (password !== confirmPassword) {
      setError("Password do not match!");
    }
    try {
      const res = await register({ user: username, email, password }).unwrap();
      if (isSuccess) {
        setPassword("");
        setUsername("");
        setEmail("");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      if (err.status === 409) {
        setError(err.data?.message);
      }
    }
  };
  return (
    <section className="register-page">
      <div className="ads-section"></div>
      <div className="register-section">
        {isError ? <p className="error-message">{error}</p> : ""}
        <h1 className="register-title">Register</h1>
        <form className="register-form" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="username"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="username">Username </label>
          </div>
          <div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password </label>
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="fa-solid fa-eye"></i>
              ) : (
                <i className="fa-solid fa-eye-slash"></i>
              )}
            </span>
          </div>
          <div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              autoComplete="off"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label htmlFor="confirmPassword">
              Confirm Password{"  "}
              {isMatch ? (
                <span>
                  <i
                    className="fa-solid fa-check"
                    style={{ color: "#63E6BE" }}
                  ></i>
                </span>
              ) : confirmPassword !== "" ? (
                <span>
                  <i className="fa-solid fa-xmark" style={{ color: "red" }}></i>
                </span>
              ) : (
                ""
              )}
            </label>
            <span
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <i className="fa-solid fa-eye"></i>
              ) : (
                <i className="fa-solid fa-eye-slash"></i>
              )}
            </span>
          </div>
          <div>
            <input
              type="text"
              id="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Email Address </label>
          </div>
          <section className="register-button">
            <button className="button-signUp">Sign Up</button>
            <Link to="/login" style={{ textDecoration: "none" }}>
              Have an Account?
            </Link>
          </section>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;
