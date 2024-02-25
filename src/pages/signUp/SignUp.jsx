import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`http://localhost:5000/api/auth/signup`, {
        username: email,
        password: password,
      });

      if (res?.data?.success === false) {
        setLoading(false);
        setError(res?.data?.error);
        return;
      }

      setLoading(false);
      setError(null);
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.error);
      console.log(error);
    }
  };

  return (
    <div className="wrapper">
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
          <div className="heading">Register</div>
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
              <button className="signup">Sign Up</button>
            </form>
            <div className="container2">
              <span>Already have an account? </span>
              <Link className="linkbutton" to="/signin">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
