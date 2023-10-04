import { makeStyles } from "@mui/styles";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { appColors } from "../../../constants";
import ProductItem from "./productItem";

function LatestProducts() {
  const { products, isLoading } = useSelector((state) => state.products);
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <section className={classes.mainContainer}>
      <div className="container">
        <div className={classes.flexSpace}>
          <h3 className={classes.title}>Latest Products</h3>
          <button
            className={classes.btn}
            onClick={() => navigate("/categories/all")}
          >
            View All <i className="bi bi-arrow-right" />
          </button>
        </div>
        <div className="mt-5">
          <div className="row">
            {products.slice(0, 50).map((item, index) => (
              <ProductItem item={item} index={index} key={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default LatestProducts;

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: "0px",
  },
  imageContainer: {
    backgroundColor: appColors.WHITE,
    padding: "2rem 1rem",
    borderRadius: 5,
    "& img": {
      width: 100,
      height: 100,
      display: "block",
      margin: "auto",
    },
  },
  cartBtnContainer: {
    position: "absolute",
    bottom: -15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    "& button": {
      backgroundColor: appColors.RED,
      color: appColors.WHITE,
      borderRadius: 10,
      border: "none",
      padding: "5px 15px",
      cursor: "pointer",
      "& span": {
        fontSize: 12,
      },
      "&:hover": {
        opacity: 0.5,
      },
    },
  },
  productPriceContainer: {
    marginTop: "2rem",
    textAlign: "center",
  },
  title: {
    fontWeight: 700,
    margin: 0,
  },
  price: {
    color: appColors.RED,
    fontSize: 14,
  },
  flexSpace: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    cursor: "pointer",
    border: "none",
    background: appColors.GREEN,
    padding: "5px 1rem",
    borderRadius: 5,
    color: appColors.WHITE,
    "&:hover": {
      opacity: 0.5,
    },
  },
}));
