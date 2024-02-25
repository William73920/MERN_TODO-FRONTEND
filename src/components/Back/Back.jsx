import React from "react";
import { useNavigate } from "react-router-dom";
import "./Back.css";
import { IoChevronBack } from "react-icons/io5";

const Back = () => {
  const navigate = useNavigate();
  return (
    <button className="back" onClick={() => navigate(-1)}>
      <IoChevronBack color="white" size={20} />
    </button>
  );
};

export default Back;
