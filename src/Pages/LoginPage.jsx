import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Styles/LoginPage.css";
import { useState, useRef, useEffect } from "react";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useToast } from "../Context/ToastContext";
import FirebaseLogin from "../Components/FirebaseLogin";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { triggerToast } = useToast();

  const userRef = useRef();
  const errorRef = useRef();

  const [login, { isLoading, isSuccess }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/recent";

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  useEffect(() => {
    if (isSuccess) {
      triggerToast("Login Successfully!", "success");
    }
  }, [isSuccess]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({
        user: username,
        password: password,
      }).unwrap();
      dispatch(setCredentials({ userData }));
      setUsername("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      if (err?.status === "FETCH_ERROR") {
        setErrMsg("No Response from Server");
      } else if (err?.status === 400) {
        setErrMsg("Missing Username/Password");
      } else if (err?.status === 401) {
        setErrMsg("Unauthorized Person");
      } else {
        setErrMsg("Log-in Failed");
      }
      if (errorRef.current) errorRef.current.focus();
    }
  };

  return (
    <div className="login-page">
      <div className="forAdsSection">
        <h1>Ads Section</h1>
      </div>
      <div className="login-section">
        {isLoading ? (
          <h3>Loading...</h3>
        ) : (
          <>
            <p
              ref={errorRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1>Log-in</h1>
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
                <Link to="/register">Don't have an Account?</Link>
              </div>
            </form>

            <div className="divider">
              <span>OR</span>
            </div>

            <FirebaseLogin />
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
