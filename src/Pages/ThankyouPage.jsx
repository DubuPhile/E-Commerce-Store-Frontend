import { useNavigate } from "react-router-dom";

const ThankyouPage = () => {
  const navigate = useNavigate();
  return (
    <div className="ty-page">
      <h2>Thank you for your order.</h2>
      <button className="ty-page-button" onClick={() => navigate("/")}>
        Back to Home Page
      </button>
    </div>
  );
};

export default ThankyouPage;
