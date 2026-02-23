const Spinner = ({ message }) => {
  return (
    <div className="text-center spinner d-flex flex-column align-items-center justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      {message && <p className="spinner-message mt-3">{message}</p>}
    </div>
  );
};

export default Spinner;
