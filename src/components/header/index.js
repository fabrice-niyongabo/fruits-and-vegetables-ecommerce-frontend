import { makeStyles } from "@mui/styles";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { app, appColors } from "../../constants";

function Header() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { token, fullName, role } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  return (
    <div className={classes.mainContainer}>
      <div className="container">
        <div className={classes.flexSpace}>
          <span
            className=" m-0 p-0"
            style={{ cursor: "pointer", fontSize: 25 }}
            onClick={() => navigate("/")}
          >
            O<span style={{ color: appColors.RED }}>F</span>&
            <span style={{ color: appColors.GREEN }}>V</span>M
          </span>

          <div>
            <ul className={classes.menu}>
              <li onClick={() => navigate("/")}>Home</li>
              <li onClick={() => navigate("/contact-us")}>Conctact Us</li>
              <li onClick={() => navigate("/cart")}>Cart({cart.length})</li>
              {token.trim() === "" ? (
                <li onClick={() => navigate("/login")}>Login/Register</li>
              ) : (
                <>
                  {role === "user" ? (
                    <>
                      <li onClick={() => navigate("/profile")}>
                        {fullName.split(" ")[0]}
                      </li>
                    </>
                  ) : (
                    <>
                      <li onClick={() => navigate("/dashboard")}>Dashboard</li>
                    </>
                  )}
                  <li onClick={() => navigate("/logout")}>Logout</li>
                </>
              )}
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
