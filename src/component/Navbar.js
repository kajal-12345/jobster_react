import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { Logo } from "./index";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearStore, toggleSidebar } from "../Features/user/userSlice";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  // console.log(user.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={() => {
            dispatch(toggleSidebar());
          }}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          <button type="button" className="btn">
            <FaUserCircle />
            {user?.name}
            <FaCaretDown
              onClick={() => {
                setShowLogout(!showLogout);
              }}
            />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => {
                dispatch(clearStore("logging out..."));
                navigate("/landing");
                // toast.success("logout sucessfull");
              }}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
