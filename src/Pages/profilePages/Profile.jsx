import ProfileLayout from "../../Components/ProfileLayout";
import "../../Styles/profile.css";
import { useState, useEffect, useRef } from "react";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../features/auth/authApiSlice";
import { hideEmail } from "../../utils/hideEmail";
import ImageCropperModal from "../../Components/ImageCropperModal";

const Profile = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [isEditable, setIsEditable] = useState(false);
  const [form, setForm] = useState({
    user: "",
    email: "",
    gender: "",
    date: "",
  });
  const { data } = useGetUserQuery();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const genders = ["Male", "Female", "Other"];

  const fileRef = useRef();

  useEffect(() => {
    if (data?.data) {
      setForm({
        user: data.data.user || "",
        email: data.data.email || "",
        gender: data.data.gender || "",
        date: data.data.date || "",
      });
      setPreview(data.data?.image || null);
    }
  }, [data]);

  const handleChange = (e) => {
    const { id, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [id]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("image", croppedImage);

    try {
      await updateUser(formData).unwrap();
      console.log("Update Successfully!");
    } catch (err) {
      console.error("Update failed: ", err);
    }
    setIsEditable(false);
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    setIsEditable(false);
  };

  return (
    <ProfileLayout>
      <section className="profile-main">
        <section
          className="profile-picture"
          // src="https://png.pngtree.com/png-vector/20221130/ourmid/pngtree-user-profile-button-for-web-and-mobile-design-vector-png-image_41767880.jpg"
        >
          <input
            type="file"
            hidden
            ref={fileRef}
            accept="image/*"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              if (!selectedFile) return;
              if (selectedFile.size > 2 * 1024 * 1024) {
                alert("Max 2MB");
                return;
              }

              const imageURL = URL.createObjectURL(selectedFile);

              setImageSrc(imageURL);
              setSelectedImage(imageURL);
            }}
          />
          <div
            style={{
              width: "150px",
              height: "150px",
              overflow: "hidden",
              borderRadius: "8px",
            }}
          >
            <img
              src={
                croppedImage
                  ? URL.createObjectURL(croppedImage)
                  : preview
                    ? preview
                    : "https://png.pngtree.com/png-vector/20221130/ourmid/pngtree-user-profile-button-for-web-and-mobile-design-vector-png-image_41767880.jpg"
              }
              alt="Preview"
              onClick={() => {
                if (imageSrc) {
                  setSelectedImage(imageSrc);
                }
              }}
              style={{
                width: "100%",
                height: "100%",
                marginTop: "10px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </div>
          <button
            className="button-upload-image"
            type="button"
            disabled={!isEditable}
            onClick={() => fileRef.current.click()}
          >
            {!croppedImage && !preview ? "Upload Image" : "Change Image"}
          </button>
        </section>
        {selectedImage && (
          <ImageCropperModal
            image={selectedImage}
            aspect={1}
            onSave={(blob) => {
              setCroppedImage(blob);
              setSelectedImage(null);
            }}
            onCancel={() => setSelectedImage(null)}
          />
        )}
        <h4>My Profile</h4>
        <p>Manage and protect your account.</p>
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-form-div">
            <label htmlFor="username">Username </label>
            <section>
              <input
                type="text"
                id="username"
                autoComplete="off"
                value={form.user}
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
                id="email"
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
            <label htmlFor="gender">Gender</label>
            {genders.map((g) => (
              <div key={g} className="gender">
                <input
                  type="radio"
                  id="gender"
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
              id="date"
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
