import { useEffect, useState } from "react";

const AddAddressModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
    country: "",
    isDefault: true,
  });

  useEffect(() => {
    setForm({
      fullName: "",
      phone: "",
      street: "",
      city: "",
      province: "",
      postalCode: "",
      country: "",
      isDefault: true,
    });
  }, [isOpen]);

  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    const part1 = digits.slice(0, 3);
    const part2 = digits.slice(3, 6);
    const part3 = digits.slice(6, 10);
    if (digits.length <= 3) return part1;
    if (digits.length <= 6) return `${part1}-${part2}`;
    return `${part1}-${part2}-${part3}`;
  };

  const onChange = (e) => {
    const { id, value } = e.target;
    if (id === "phone") {
      setForm((prev) => ({
        ...prev,
        phone: formatPhoneNumber(value),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      await onSubmit(form);
    } catch (err) {
      console.log(err);
    }
  };

  if (!isOpen) return null;
  return (
    <section className="modal" style={{ display: "block" }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered ">
        <div className="modal-content text-center">
          <header className="modal-header">
            <h5 className="modal-title">Add New Address</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </header>
          <form action={onSubmit} className="address-form">
            <div>
              <label htmlFor="fullName">Name: </label>
              <input
                type="text"
                id="fullName"
                placeholder="Full Name"
                autoComplete="off"
                value={form.fullName}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="phone">Phone: +63</label>
              <input
                type="tel"
                placeholder="123-456-7890"
                id="phone"
                autoComplete="off"
                value={form.phone}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="street">Street: </label>
              <input
                type="text"
                placeholder="Street"
                id="street"
                autoComplete="off"
                value={form.street}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="city">City: </label>
              <input
                type="text"
                placeholder="City"
                id="city"
                autoComplete="off"
                value={form.city}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="province">Province: </label>
              <input
                type="text"
                placeholder="Province"
                id="province"
                autoComplete="off"
                value={form.province}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="postalCode">Postal Code: </label>
              <input
                type="text"
                placeholder="Postal Code"
                id="postalCode"
                autoComplete="off"
                value={form.postalCode}
                onChange={onChange}
              />
            </div>
            <div>
              <label htmlFor="country">Country: </label>
              <input
                type="text"
                placeholder="Country"
                id="country"
                autoComplete="off"
                value={form.country}
                onChange={onChange}
              />
            </div>
            <div>
              <span>Set Default: </span>
              <label className="radio-label">
                <input
                  className="set-default-radio"
                  type="radio"
                  name="isDefault"
                  checked={form.isDefault === true}
                  onChange={() => setForm({ ...form, isDefault: true })}
                />
                Yes
              </label>

              <label className="radio-label">
                <input
                  className="set-default-radio"
                  type="radio"
                  name="isDefault"
                  checked={form.isDefault === false}
                  onChange={() => setForm({ ...form, isDefault: false })}
                />
                No
              </label>
            </div>
          </form>
          <div className="modal-footer justify-content-center">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddAddressModal;
