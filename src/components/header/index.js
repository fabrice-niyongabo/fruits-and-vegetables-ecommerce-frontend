import { makeStyles } from "@mui/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import { app, appColors } from "../../constants";

function Header() {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <div className={classes.mainContainer}>
      <div className="container">
        <div className={classes.flexSpace}>
          <span onClick={() => navigate("/")}>Fruits&vegetables</span>
          <div>
            <ul className={classes.menu}>
              <li onClick={() => navigate("/")}>Home</li>
              <li onClick={() => navigate("/contact-us")}>Conctact Us</li>
              <li onClick={() => navigate("/cart")}>Cart</li>
              <li onClick={() => navigate("/login")}>Login/Register</li>
              <li>
                <i className="bi bi-search" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundImage: `url("${app.PUBLIC_URL}/assets/images/bg.png")`,
    background: appColors.GRAY,
    padding: "2rem",
  },
  flexSpace: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menu: {
    margin: 0,
    padding: 0,
    "& li": {
      display: "inline-block",
      listStyle: "none",
      marginLeft: "2rem",
      fontWeight: 700,
      "&:hover": {
        color: appColors.RED,
        cursor: "pointer",
      },
    },
  },
}));
