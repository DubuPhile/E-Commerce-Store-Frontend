const AddressLine = ({ address, onEdit }) => {
  return (
    <section className="select-address">
      <div className="address-line-main">
        <div className="address-name-line">
          <h5>{address.fullName}</h5>
          <span>{address.phone}</span>
        </div>
        <div className="address-line">
          <p>
            {address.street +
              " ," +
              address.city +
              " ," +
              address.province +
              " ," +
              address.country +
              " ," +
              address.postalCode}
          </p>
          {address.isDefault === true ? <span>Default</span> : ""}
        </div>
      </div>
      <button onClick={onEdit}>Edit</button>
    </section>
  );
};

export default AddressLine;
