import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useRefreshMutation } from "../features/auth/authApiSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const [refreshApi] = useRefreshMutation();

  const refresh = async () => {
    try {
      const data = await refreshApi().unwrap();
      if (data) {
        dispatch(setCredentials(data));
        return data;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return refresh;
};

export default useRefreshToken;
