import React from "react";
import "./Footer.css";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { FaNotesMedical } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../../redux/user/userSlice";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";

const Footer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await axios.get(`http://localhost:5000/api/auth/signout`, {
        withCredentials: true,
      });

      const data = res?.data;
      if (data?.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }

      dispatch(signOutSuccess());
      navigate("/signin");
    } catch (error) {
      dispatch(signOutFailure(error?.response?.data?.message));
      console.log(error);
    }
  };

  return (
    <div className="footer">
      <button onClick={handleSignOut}>
        <LiaSignOutAltSolid color="white" size={24} />
      </button>
      <Link to="/create">
        <button>
          <CiCirclePlus color="white" size={25} />
        </button>
      </Link>
    </div>
  );
};

export default Footer;
