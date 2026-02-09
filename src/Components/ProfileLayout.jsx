import Layout from "./Layout";
import ProfileSideBar from "./ProfileSideBar";

const ProfileLayout = ({ children }) => {
  return (
    <Layout>
      <div className="profile-layout">
        <ProfileSideBar />
        <div className="profile-body">{children}</div>
      </div>
    </Layout>
  );
};

export default ProfileLayout;
