import ProfileLayout from "../../Components/ProfileLayout";
import { useState } from "react";
import "../../Styles/changePassword.css";
import { useChangePasswordMutation } from "../../features/auth/authApiSlice";
import { useToast } from "../../Context/ToastContext";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [cPwd, setCPwd] = useState(false);
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const [ShowCurrentPwd, setShowCurrentPwd] = useState(false);
  const [ShowNewPwd, setShowNewPwd] = useState(false);
  const [ShowConfirmPwd, setShowConfirmPwd] = useState(false);

  const { triggerToast } = useToast();
  const [changePwd, { isLoading }] = useChangePasswordMutation();
  const navigate = useNavigate();

  const onCancel = () => {
    setCPwd(false);
    setConfirmPwd("");
    setCurrentPwd("");
    setNewPwd("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newPwd !== confirmPwd) {
        return triggerToast(
          "new password and Confirm password Do not match!",
          "error",
        );
      }

      await changePwd({ currentPwd, newPwd }).unwrap();

      console.log("success");
      triggerToast("Password Change", "success");
      navigate("/profile");
    } catch (err) {
      console.log(err);
      triggerToast(err?.data?.message || "Password change failed", "error");
    }
  };
  return (
    <ProfileLayout>
      <section className="cpwd-body">
        <h4> ChangePassword </h4>
        {!cPwd && (
          <>
            <form className="change-password-form">
              <label htmlFor="pwd">Password: </label>
              <input
                className="preview-pwd"
                type="password"
                autoComplete="none"
                id="pwd"
                disabled
                defaultValue="************"
                readOnly
              />
            </form>
            <button onClick={() => setCPwd(true)} className="cpwd-button">
              Change Password
            </button>
          </>
        )}
        {cPwd && (
          <>
            <form className="change-password-form" onSubmit={onSubmit}>
              <label htmlFor="currentPwd">Current Password: </label>
              <div className="change-pwd-input">
                <input
                  type={ShowCurrentPwd ? "text" : "password"}
                  autoComplete="none"
                  id="currentPwd"
                  value={currentPwd}
                  onChange={(e) => setCurrentPwd(e.target.value)}
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowCurrentPwd(!ShowCurrentPwd)}
                >
                  {ShowCurrentPwd ? (
                    <i className="fa-solid fa-eye"></i>
                  ) : (
                    <i className="fa-solid fa-eye-slash"></i>
                  )}
                </span>
              </div>

              <label htmlFor="newPwd">New Password: </label>
              <div className="change-pwd-input">
                <input
                  type={ShowNewPwd ? "text" : "password"}
                  autoComplete="none"
                  id="newPwd"
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowNewPwd(!ShowNewPwd)}
                >
                  {ShowNewPwd ? (
                    <i className="fa-solid fa-eye"></i>
                  ) : (
                    <i className="fa-solid fa-eye-slash"></i>
                  )}
                </span>
              </div>

              <label htmlFor="confirmPwd">Confirm Password: </label>
              <div className="change-pwd-input">
                <input
                  type={ShowConfirmPwd ? "text" : "password"}
                  autoComplete="none"
                  id="confirmPwd"
                  value={confirmPwd}
                  onChange={(e) => setConfirmPwd(e.target.value)}
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowConfirmPwd(!ShowConfirmPwd)}
                >
                  {ShowConfirmPwd ? (
                    <i className="fa-solid fa-eye"></i>
                  ) : (
                    <i className="fa-solid fa-eye-slash"></i>
                  )}
                </span>
              </div>
              <div className="cancel-confirm-buttons">
                <button
                  type="button"
                  onClick={onCancel}
                  className="cpwd-button-cancel"
                >
                  Cancel
                </button>
                <button type="submit" className="cpwd-button">
                  Confirm
                </button>
              </div>
            </form>
          </>
        )}
      </section>
    </ProfileLayout>
  );
};

export default ChangePassword;
