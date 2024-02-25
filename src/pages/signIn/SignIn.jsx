import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../redux/user/userSlice";
import Loader from "../../components/Loader/Loader";

const SignIn = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(loginStart());
      const res = await axios.post(
        `http://localhost:5000/api/auth/signin`,
        {
          username: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      if (res?.data?.success === false) {
        dispatch(loginFailure(res.data.message));
        console.log(res.data.message);
        return;
      }

      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch(loginFailure(error?.response?.data?.message));
    }
  };

  return currentUser ? (
    <Loader />
  ) : (
    <div className="wrapper">
      <div className="container">
        <div className="heading">Login</div>
        <div className="register">
          <form className="form_container" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              autoComplete="off"
              className="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="off"
              className="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <div className="error">{error}</div>}
            <button className="signup">Sign In</button>
          </form>
          <div className="container2">
            <span>Don't have an account? </span>
            <Link className="linkbutton" to="/signUp">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
