import ProfileLayout from "../../Components/ProfileLayout";
import "../../Styles/changePassword.css";
import {
  useSendOTPMutation,
  useVerifyOTPMutation,
} from "../../features/otp/otpApiSlice";
import { useToast } from "../../Context/ToastContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import OTPModal from "../../Components/OtpModal";
import Spinner from "../../Components/Loading";

const setPassword = () => {
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const [SPwd, setSPwd] = useState(false);
  const [ShowNewPwd, setShowNewPwd] = useState(false);
  const [ShowConfirmPwd, setShowConfirmPwd] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const { triggerToast } = useToast();
  const [sendOTP, { isLoading: isSendingOTP }] = useSendOTPMutation();
  const [verifyOTP, { isLoading: isVerifyingOTP }] = useVerifyOTPMutation();
  const navigate = useNavigate();

  const onCancel = () => {
    setSPwd(false);
    setConfirmPwd("");
    setNewPwd("");
  };

  const onSetPwd = (e) => {
    e.preventDefault();
    try {
      sendOTP({ type: "SET_PASSWORD" }).unwrap();
      setShowOtpModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleVerifyOtp = async (otp) => {
    try {
      await verifyOTP({ otp }).unwrap();
      setSPwd(true);
      setShowOtpModal(false);

      triggerToast("OTP Verified", "success");
    } catch (err) {
      console.log(err);
      triggerToast(`${err?.data?.message || "Something went wrong!"}`, "error");
    }
  };

  const onSubmit = () => {};

  return (
    <ProfileLayout>
      <section className="cpwd-body">
        {isVerifyingOTP || isSendingOTP ? (
          <Spinner />
        ) : (
          <>
            <h4> Set Password(Optional) </h4>
            {!SPwd && (
              <>
                <p className="set-password-p">
                  You can set a password now to secure your account, or skip
                  this step if you prefer using other login methods. A strong
                  password helps keep your account safe.
                </p>
                <button onClick={onSetPwd} className="cpwd-button">
                  Set Password
                </button>
              </>
            )}
            {SPwd && (
              <>
                <form className="change-password-form" onSubmit={onSubmit}>
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
    </ProfileLayout>
  );
};

export default setPassword;
