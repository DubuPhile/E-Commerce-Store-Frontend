const AddressLine = ({ address }) => {
  return (
    <section className="address-line-main">
      <div className="address-name-line">
        <h5>{address.fullName}</h5>
        <span>{address.phone}</span>
        <button>Edit</button>
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
    </section>
  );
};

export default AddressLine;
