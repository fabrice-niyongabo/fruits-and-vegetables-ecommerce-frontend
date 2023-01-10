import { makeStyles } from "@mui/styles";
import React from "react";
import { app } from "../../../constants";

function Welcome() {
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      <img
        className={classes.bgImg}
        src={`${app.PUBLIC_URL}/assets/images/welcome.jpg`}
        alt=""
      />
      <div className={classes.aboutMaincontainer}>
        <div className={`${classes.aboutContainer} shadow`}>
          <h2 className="text-center">About</h2>
          <p>
            <small>
              This is a short description, This is a short description, This is
              a short description, This is a short description, This is a short
              description, This is a short description, description, This is a
              short description, This is a short description, This is a short
              description, This is a short description,
            </small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Welcome;

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: "60vh",
    position: "relative",
  },
  flexSpace: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  aboutMaincontainer: {
    position: "absolute",
    width: "100%",
    bottom: "-5rem",
  },
  aboutContainer: {
    margin: "auto",
    width: "50%",
    background: "#fff",
    padding: "2rem",
    borderRadius: 10,
  },
  bgImg: {
    width: "100%",
    height: "100%",
  },
}));
