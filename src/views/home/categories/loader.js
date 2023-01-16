import { Skeleton } from "@mui/material";
import React from "react";

function Loader() {
  return (
    <>
      <div className="col-md-2 mb-3">
        <Skeleton height={100} />
      </div>
    </>
  );
}

export default Loader;
