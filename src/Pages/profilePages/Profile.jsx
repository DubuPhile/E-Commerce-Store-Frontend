import ProfileLayout from "../../Components/ProfileLayout";
import "../../Styles/profile.css";
import { useState, useEffect } from "react";
import { useGetUserQuery } from "../../features/auth/authApiSlice";
import { hideEmail } from "../../utils/hideEmail";

const Profile = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    gender: "",
    date: "",
  });
  const { data } = useGetUserQuery();
  const genders = ["Male", "Female", "Other"];

  useEffect(() => {
    if (data?.data) {
      setForm({
        username: data.data.user || "",
        email: data.data.email || "",
        gender: data.data.gender || "",
        date: data.data.date || "",
      });
    }
  }, [data]);

  console.log(hideEmail(form.email));

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    setIsEditable(false);
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    setIsEditable(false);
  };
  return (
    <ProfileLayout>
      <section className="profile-main">
        <img
          className="profile-picture"
          src="https://png.pngtree.com/png-vector/20221130/ourmid/pngtree-user-profile-button-for-web-and-mobile-design-vector-png-image_41767880.jpg"
        />
        <h4>My Profile</h4>
        <p>Manage and protect your account.</p>
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-form-div">
            <label htmlFor="username">Username </label>
            <section>
              <input
                type="text"
                name="username"
                autoComplete="off"
                value={form.username}
                onChange={handleChange}
                disabled={!isEditable}
              />
            </section>
          </div>
          <div className="profile-form-div">
            <label htmlFor="email">Email </label>
            <section>
              <input
                type="text"
                name="email"
                autoComplete="off"
                value={
                  isEditable === false ? hideEmail(form.email) : form.email
                }
                onChange={handleChange}
                disabled={!isEditable}
              />
            </section>
          </div>
          <div className="gender-main">
            <label>Gender</label>
            {genders.map((g) => (
              <div key={g} className="gender">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={form.gender === g}
                  onChange={handleChange}
                  disabled={!isEditable}
                />
                {g}
              </div>
            ))}
          </div>
          <div className="date-main">
            <label htmlFor="date">Date of Birth</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>
          {isEditable === false ? (
            <button
              className="button-Edit"
              onClick={(e) => setIsEditable(true, e.preventDefault())}
            >
              <span>Edit</span>
              <i className="fa-solid fa-pen edit-icon"></i>
            </button>
          ) : (
            <div className="button-cancel-submit">
              <button
                className="button-Cancel"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button className="button-Submit" type="submit">
                Submit
              </button>
            </div>
          )}
        </form>
      </section>
    </ProfileLayout>
  );
};

export default Profile;
