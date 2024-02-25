import React from "react";
import "./Loader.css";
import { ColorRing } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader">
      <ColorRing
        height="100"
        width="100"
        visible={true}
        ariaLabel="blocks-loading"
      />
    </div>
  );
};

export default Loader;
