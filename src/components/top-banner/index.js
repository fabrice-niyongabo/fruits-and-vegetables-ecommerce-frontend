import { makeStyles } from "@mui/styles";
import React from "react";
import { app, appColors } from "../../constants";

function TopBanner({ title }) {
  const classes = useStyles();
  return (
    <div className={classes.bannerContainer}>
      <h1 className={classes.title}>{title}</h1>
    </div>
  );
}

export default TopBanner;

const useStyles = makeStyles((theme) => ({
  title: {
    color: appColors.GREEN,
    textTransform: "uppercase",
  },
  bannerContainer: {
    backgroundImage: `url("${app.PUBLIC_URL}/assets/images/top-banner.jpg")`,
    height: "30vh",
    backgroundSize: "100% 100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
