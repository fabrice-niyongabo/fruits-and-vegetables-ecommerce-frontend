import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import { app, appColors } from "../../../constants";
import {
  currencyFormatter,
  errorHandler,
  toastMessage,
} from "../../../helpers";
import { setCart } from "../../../redux/actions/cart";

function ProductItem({ item }) {
  const { token } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const classes = useStyles();
  const dispatch = useDispatch();

  const [showLoader, setShowLoader] = useState(false);

  const handleAddToCart = () => {
    let data;
    setShowLoader(true);
    if (token && token.trim() !== "") {
      data = {
        productId: item._id,
        price: item.price,
        quantity: 1,
        token,
      };
    } else {
      data = {
        productId: item._id,
        price: item.price,
        quantity: 1,
      };
    }
    axios
      .post(app.BACKEND_URL + "/cart/", data)
      .then((res) => {
        setTimeout(() => {
          setShowLoader(false);
          toastMessage("success", res.data.msg);
          dispatch(setCart([...cart, res.data.item]));
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          setShowLoader(false);
          errorHandler(error);
        }, 1000);
      });
  };
  return (
    <div className="col-md-2 mb-3">
      <div style={{ position: "relative" }}>
        <div className={classes.imageContainer}>
          <img src={item.image.secure_url} alt={item.name} />
        </div>
        <div className={classes.cartBtnContainer}>
          <button
            disabled={showLoader}
            style={{ opacity: showLoader ? 0.5 : 1 }}
            onClick={() => handleAddToCart()}
          >
            {showLoader ? (
              <>
                <Spinner size="sm" color="white" /> <span>Adding to cart</span>
              </>
            ) : (
              <>
                <i className="bi bi-cart" /> <span>Add to cart</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className={classes.productPriceContainer}>
        <p className={classes.title}>{item.name}</p>
        <p className={classes.price}>{currencyFormatter(item.price)} RWF</p>
      </div>
    </div>
  );
}

export default ProductItem;

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
