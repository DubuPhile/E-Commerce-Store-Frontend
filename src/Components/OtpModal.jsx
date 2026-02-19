import { useState, useEffect, useRef } from "react";
import { useSendOTPMutation } from "../features/otp/otpApiSlice";

const OTPModal = ({ isOpen, onClose, onVerify }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(60);
  const [error, setError] = useState("");
  const [sendOTP] = useSendOTPMutation();

  const inputsRef = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (!isOpen || timeLeft <= 0) return;

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [isOpen, timeLeft]);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setOtp(new Array(6).fill(""));
      setError("");
      setTimeLeft(60);
      inputsRef.current[0]?.focus();
    }
  }, [isOpen]);

  const handleChange = (value, idx) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);

    if (value && idx < 5) {
      inputsRef.current[idx + 1].focus();
    }
    if (!value && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setError("Please enter all 6 digits");
      return;
    }
    const success = await onVerify(otpValue);
    if (!success) setError("Invalid OTP");
  };

  if (!isOpen) return null;

  return (
    <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content text-center">
          <div className="modal-header">
            <h5 className="modal-title">Enter OTP</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p className="text-muted">Check your Email for OTP code</p>
            <div className="d-flex justify-content-between mb-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={idx}
                  autoComplete="off"
                  type="text"
                  maxLength="1"
                  value={digit}
                  ref={(el) => (inputsRef.current[idx] = el)}
                  onChange={(e) => handleChange(e.target.value, idx)}
                  className="form-control text-center mx-1"
                  style={{ width: "3rem", fontSize: "1.5rem" }}
                />
              ))}
            </div>
            {error && (
              <small className="text-danger d-block mb-2">{error}</small>
            )}
            <p className="text-muted">
              {timeLeft > 0
                ? `Resend OTP in ${timeLeft}s`
                : "OTP will expired in 5mins."}
            </p>
          </div>
          <div className="modal-footer justify-content-center">
            {timeLeft <= 0 && (
              <button
                className="btn btn-link"
                onClick={() => {
                  setOtp(new Array(6).fill(""));
                  setError("");
                  setTimeLeft(60);
                  inputsRef.current[0]?.focus();
                  // call resend OTP API here
                  sendOTP({ type: "CHANGE_PASSWORD" }).unwrap();
                }}
              >
                Resend OTP
              </button>
            )}
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleVerify}>
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
