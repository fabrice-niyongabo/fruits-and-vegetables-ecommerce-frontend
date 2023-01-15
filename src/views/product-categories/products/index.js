import { makeStyles } from "@mui/styles";
import React from "react";
import { app, appColors } from "../../../constants";

function Products() {
  const classes = useStyles();
  return (
    <section className={classes.mainContainer}>
      <div className="container">
        <div className="">
          <div className="row">
            <div className="col-md-4 mb-3">
              <div style={{ position: "relative" }}>
                <div className={classes.imageContainer}>
                  <img
                    src={`${app.PUBLIC_URL}/assets/images/banana.png`}
                    alt=""
                  />
                </div>
                <div className={classes.cartBtnContainer}>
                  <button>
                    <i className="bi bi-cart" /> <span>Add to cart</span>
                  </button>
                </div>
              </div>
              <div className={classes.productPriceContainer}>
                <p className={classes.title}>Banana</p>
                <p className={classes.price}>100 RWF</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div style={{ position: "relative" }}>
                <div className={classes.imageContainer}>
                  <img
                    src={`${app.PUBLIC_URL}/assets/images/banana.png`}
                    alt=""
                  />
                </div>
                <div className={classes.cartBtnContainer}>
                  <button>
                    <i className="bi bi-cart" /> <span>Add to cart</span>
                  </button>
                </div>
              </div>
              <div className={classes.productPriceContainer}>
                <p className={classes.title}>Banana</p>
                <p className={classes.price}>100 RWF</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div style={{ position: "relative" }}>
                <div className={classes.imageContainer}>
                  <img
                    src={`${app.PUBLIC_URL}/assets/images/banana.png`}
                    alt=""
                  />
                </div>
                <div className={classes.cartBtnContainer}>
                  <button>
                    <i className="bi bi-cart" /> <span>Add to cart</span>
                  </button>
                </div>
              </div>
              <div className={classes.productPriceContainer}>
                <p className={classes.title}>Banana</p>
                <p className={classes.price}>100 RWF</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div style={{ position: "relative" }}>
                <div className={classes.imageContainer}>
                  <img
                    src={`${app.PUBLIC_URL}/assets/images/banana.png`}
                    alt=""
                  />
                </div>
                <div className={classes.cartBtnContainer}>
                  <button>
                    <i className="bi bi-cart" /> <span>Add to cart</span>
                  </button>
                </div>
              </div>
              <div className={classes.productPriceContainer}>
                <p className={classes.title}>Banana</p>
                <p className={classes.price}>100 RWF</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div style={{ position: "relative" }}>
                <div className={classes.imageContainer}>
                  <img
                    src={`${app.PUBLIC_URL}/assets/images/banana.png`}
                    alt=""
                  />
                </div>
                <div className={classes.cartBtnContainer}>
                  <button>
                    <i className="bi bi-cart" /> <span>Add to cart</span>
                  </button>
                </div>
              </div>
              <div className={classes.productPriceContainer}>
                <p className={classes.title}>Banana</p>
                <p className={classes.price}>100 RWF</p>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div style={{ position: "relative" }}>
                <div className={classes.imageContainer}>
                  <img
                    src={`${app.PUBLIC_URL}/assets/images/banana.png`}
                    alt=""
                  />
                </div>
                <div className={classes.cartBtnContainer}>
                  <button>
                    <i className="bi bi-cart" /> <span>Add to cart</span>
                  </button>
                </div>
              </div>
              <div className={classes.productPriceContainer}>
                <p className={classes.title}>Banana</p>
                <p className={classes.price}>100 RWF</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;

const useStyles = makeStyles((theme) => ({
  mainContainer: {},
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
