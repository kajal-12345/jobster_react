import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/RegisterPage";
import { Logo, FormRow } from "../component/index";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { userRegister, userLogin } from "../Features/user/userSlice";
import { useNavigate } from "react-router-dom";
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

function Register() {
  const [values, setValues] = useState(initialState);
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        naviagte("/");
      }, 3000);
    }
  }, [user, naviagte]);

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(e.target);
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      // console.log("please fill out all fields");
      toast.error("please fill out all fields");
      return;
    }
    if (isMember) {
      dispatch(userLogin({ email, password }));

      return;
    }
    dispatch(userRegister({ name, email, password }));
  };

  return (
    <Wrapper className="full-page">
      <section>
        <form className="form" onSubmit={handleSubmit}>
          <Logo />
          <h3>{values.isMember ? "Login" : "Register"}</h3>
          {!values.isMember && (
            <FormRow
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
            />
          )}

          <FormRow
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          <FormRow
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {/* {values.isMember ? "Login" : "Register"} */}
            {isLoading ? "loading...." : values.isMember ? "Login" : "Register"}
          </button>
          <button
            type="submit"
            className="btn btn-block btn-hipster"
            disabled={isLoading}
            onClick={() => {
              dispatch(
                userLogin({ email: "testUser@test.com", password: "secret" })
              );
            }}
          >
            {/* {values.isMember ? "Login" : "Register"} */}
            demo
          </button>
          <p>
            {values.isMember ? "not a member yet?" : "Already a member?"}{" "}
            <button type="button" className="member-btn" onClick={toggleMember}>
              {values.isMember ? "Register" : "Login"}
            </button>
          </p>
        </form>
      </section>
    </Wrapper>
  );
}
export default Register;
