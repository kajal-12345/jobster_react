import { Link } from "react-router-dom";
import Wrapper from "../assets/wrapperss/ErrorPage";
import error from "../assets/images/not-found.svg";
const Error = () => {
  return (
    <Wrapper>
      <div>
        <img src={error} alt="page not found"></img>
        <h3>ohh! Page not found</h3>
        <p>we can't seem to find the page you are looking for</p>
        <Link to="/">Back Home</Link>
      </div>
    </Wrapper>
  );
};
export default Error;
