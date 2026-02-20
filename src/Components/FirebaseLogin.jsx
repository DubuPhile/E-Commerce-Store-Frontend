import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/Firebase";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import "../Styles/firebaseLogin.css";
import { useFirebaseLoginMutation } from "../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";

const FirebaseLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firebaseLogin] = useFirebaseLoginMutation();

  const SocialLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      const userData = await firebaseLogin({ token }).unwrap();
      dispatch(setCredentials(userData));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="d-flex justify-content-center">
      <button
        type="primary"
        className="firebaseLogin"
        onClick={() => SocialLogin(googleProvider)}
      >
        <div className="firebase-login-icon" />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
};

export default FirebaseLogin;
