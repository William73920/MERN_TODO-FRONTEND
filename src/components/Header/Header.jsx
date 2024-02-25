import React from "react";
import { useSelector } from "react-redux";
import "./Header.css";

const Header = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <header className="home__header">
      <h1>Notes</h1>
      <p>Hello, {user?.username}</p>
    </header>
  );
};

export default Header;
