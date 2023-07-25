import { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { FormRow } from "../../component";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "../../Features/user/userSlice";
const Profile = () => {
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    id:user?._id || "",
    name: user?.name || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    location: user?.location || "",
  });
  // console.log(userData);

  const hanadleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(e.target);
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, lastName, email, location } = userData;
    if (!name || !lastName || !email || !location) {
      toast.error("please filled out all fields");

      return;
    }
    // console.log(userData?.lastName);
    dispatch(updateUser(userData));
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        <div className="form-center">
          <FormRow
            name="name"
            type="text"
            value={userData.name}
            onChange={hanadleChange}
          />
          <FormRow
            name="lastName"
            type="text"
            value={userData?.lastName}
            onChange={hanadleChange}
          />
          <FormRow
            name="email"
            type="email"
            value={userData.email}
            onChange={hanadleChange}
          />
          <FormRow
            name="location"
            type="text"
            value={userData?.location}
            onChange={hanadleChange}
          />
          <button type="submit" className="btn btn-block">
            {isLoading ? "Loading....." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Profile;
