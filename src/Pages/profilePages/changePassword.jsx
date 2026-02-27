import { useState } from "react";
import "../../Styles/changePassword.css";
import { useChangePasswordMutation } from "../../features/auth/authApiSlice";
import {
  useSendOTPMutation,
  useVerifyOTPMutation,
} from "../../features/otp/otpApiSlice";
import { useToast } from "../../Context/ToastContext";
import { useNavigate } from "react-router-dom";
import OTPModal from "../../Components/OtpModal";
import Spinner from "../../Components/Spinner";

const ChangePassword = () => {
  const [cPwd, setCPwd] = useState(false);
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const [ShowCurrentPwd, setShowCurrentPwd] = useState(false);
  const [ShowNewPwd, setShowNewPwd] = useState(false);
  const [ShowConfirmPwd, setShowConfirmPwd] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const { triggerToast } = useToast();
  const [changePwd, { isLoading: isChangingPwd }] = useChangePasswordMutation();
  const [sendOTP, { isLoading: isSendingOTP }] = useSendOTPMutation();
  const [verifyOTP, { isLoading: isVerifyingOTP }] = useVerifyOTPMutation();
  const navigate = useNavigate();

  const onCancel = () => {
    setCPwd(false);
    setConfirmPwd("");
    setCurrentPwd("");
    setNewPwd("");
  };

  const onChangePwd = async (e) => {
    e.preventDefault();
    try {
      await sendOTP({ type: "CHANGE_PASSWORD" }).unwrap();
      setShowOtpModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleVerifyOtp = async (otp) => {
    try {
      await verifyOTP({ otp }).unwrap();
      setCPwd(true);
      setShowOtpModal(false);

      triggerToast("OTP Verified", "success");
    } catch (err) {
      console.log(err);
      triggerToast(`${err?.data?.message || "Something went wrong!"}`, "error");
    }
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
    <>
      <section className="cpwd-body">
        {isChangingPwd || isVerifyingOTP || isSendingOTP ? (
          <Spinner
            message={
              isVerifyingOTP
                ? "Verifying OTP..."
                : isSendingOTP
                  ? "Sending OTP..."
                  : "Changing password..."
            }
          />
        ) : (
          <>
            <h4> Change Password </h4>
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
                <button onClick={onChangePwd} className="cpwd-button">
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
            <OTPModal
              isOpen={showOtpModal}
              onClose={() => setShowOtpModal(false)}
              onVerify={handleVerifyOtp}
            />
          </>
        )}
      </section>
    </>
  );
};

export default ChangePassword;
