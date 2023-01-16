import React from "react";
import "./loader.scss";
import { Spinner } from "reactstrap";

const MiniLoader = () => (
  <div className="fallback-spinner" style={{ height: "20vh" }}>
    <div className="loading" style={{ top: "20%" }}>
      <Spinner color="primary" />
    </div>
  </div>
);
export default MiniLoader;
