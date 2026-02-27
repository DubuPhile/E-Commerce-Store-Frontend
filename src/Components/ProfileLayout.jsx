import ProfileSideBar from "./ProfileSideBar";
import { Outlet } from "react-router-dom";

const ProfileLayout = () => {
  return (
    <>
      <div className="profile-layout">
        <ProfileSideBar />
        <div className="profile-body">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ProfileLayout;
