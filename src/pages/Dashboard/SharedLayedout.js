import { Outlet } from "react-router-dom";
import { BigSidebar, Navbar, SmallSidebar } from "../../component/index";
import Wrapper from "../../assets/wrappers/SharedLayout";
const SharedLayedout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar />
        <BigSidebar />

        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};
export default SharedLayedout;
