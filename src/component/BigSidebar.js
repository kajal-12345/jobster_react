import Wrapper from "../assets/wrappers/BigSidebar";
// import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import links from "../utils/links";
import { Logo } from "./index";
import { useSelector } from "react-redux";

const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <div>
            {links.map((link) => {
              return (
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                 
                  key={link.id}
                  to={link.path}
                >
                  <span className="icon">{link.icon}</span>
                  {link.text}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
