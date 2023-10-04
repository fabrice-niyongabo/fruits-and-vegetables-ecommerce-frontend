import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import { app, appColors } from "../../../constants";
import Confirmation from "../../../controllers/confirmation";
import {
  currencyFormatter,
  errorHandler,
  toastMessage,
} from "../../../helpers";
import { fetchCart } from "../../../redux/actions/cart";

function CartItem({ item, setQuantities, quantities, index }) {
  const dispatch = useDispatch();
  const classess = useStyles();
  const { token } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(item.quantity);
  const [showLoader, setShowLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handlePlus = () => {
    setQuantity(quantity + 1);
    const qty = quantities.filter((value) => value.index === index);
    if (qty.length === 1) {
      const updated = [...quantities];
      for (let i = 0; i < updated.length; i++) {
        if (updated[i].index === index) {
          updated[i] = { index, value: quantity + 1 };
        }
      }
      setQuantities([...updated]);
    } else {
      setQuantities([...quantities, { index, value: quantity + 1 }]);
    }
  };

  const handleMinus = () => {
    if (quantity - 1 > 0) {
      setQuantity(quantity - 1);
      const qty = quantities.filter((value) => value.index === index);
      if (qty.length === 1) {
        const updated = [...quantities];
        for (let i = 0; i < updated.length; i++) {
          if (updated[i].index === index) {
            updated[i] = { index, value: quantity - 1 };
          }
        }
        setQuantities([...updated]);
      } else {
        setQuantities([...quantities, { index, value: quantity - 1 }]);
      }
    }
  };

  const handleUpdate = () => {
    let data;
    setShowLoader(true);
    if (token && token.trim() !== "") {
      data = {
        quantity,
        id: item._id,
        token,
      };
    } else {
      data = { quantity, id: item._id };
    }

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/cart/update/", data)
      .then((res) => {
        setTimeout(() => {
          setShowLoader(false);
          toastMessage("success", res.data.msg);
          dispatch(fetchCart());
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          setShowLoader(false);
          errorHandler(error);
        }, 1000);
      });
  };

  const handleDelete = () => {
    let data;
    setShowLoader(true);
    if (token && token.trim() !== "") {
      data = {
        quantity,
        id: item._id,
        token,
      };
    } else {
      data = {
        id: item._id,
      };
    }

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/cart/delete/", data)
      .then((res) => {
        setShowLoader(false);
        toastMessage("success", res.data.msg);
        dispatch(fetchCart());
      })
      .catch((error) => {
        setShowLoader(false);
        errorHandler(error);
      });
  };

  const getProductName = () => {
    let name = "";
    const pr = products.find((i) => i._id === item.productId);
    if (pr) {
      name = pr.name;
    }
    return name;
  };

  const getProductImage = () => {
    let image = "";
    const pr = products.find((i) => i._id === item.productId);
    if (pr) {
      image = app.FILE_URL + pr.image;
    }
    return image;
  };

  return (
    <>
      <tr>
        <td>
          <div className={classess.flexSpace}>
            <img
              src={getProductImage()}
              alt=""
              className={classess.productImage}
            />
            <p className={classess.productTitle}>{getProductName()}</p>
          </div>
        </td>
        <td>{currencyFormatter(item.price)} RWF</td>
        <td>
          <div
            className={`${classess.flexSpaceBetween} ${classess.qtyContainer}`}
          >
            <div
              className={classess.btn}
              onClick={() => {
                handleMinus();
              }}
            >
              -
            </div>
            <span className={classess.qty}>{quantity}</span>
            <div
              className={classess.btn}
              onClick={() => {
                handlePlus();
              }}
            >
              +
            </div>
          </div>
        </td>
        <td style={{ color: appColors.GREEN, textAlign: "center" }}>
          {item.price * quantity} RWF
        </td>
        <td className="text-center">
          {showLoader ? (
            <Spinner color="primary" />
          ) : (
            <>
              {quantity != item.quantity && (
                <button
                  className="btn  btn-success"
                  onClick={() => handleUpdate()}
                >
                  Update
                </button>
              )}
              <button className="btn" onClick={() => setShowAlert(true)}>
                <i className="bi bi-trash" />
              </button>
            </>
          )}
        </td>
      </tr>
      <Confirmation
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        callback={handleDelete}
        title={"Do you want to remove " + getProductName() + " from your cart?"}
      />
    </>
  );
}

export default CartItem;

const useStyles = makeStyles((theme) => ({
  flexSpace: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  flexSpaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productImage: {
    width: 50,
  },
  productTitle: {
    margin: 0,
    padding: 0,
    marginLeft: 10,
    fontWeight: 700,
  },
  qtyContainer: {
    background: appColors.WHITE,
    padding: "5px 10px",
    borderRadius: 20,
    width: "60%",
  },
  btn: {
    fontSize: 25,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    background: appColors.GRAY,
    borderRadius: 100,
    userSelect: "none",
    width: 30,
    height: 30,
    "&:hover": {
      color: appColors.WHITE,
      background: appColors.RED,
      cursor: "pointer",
    },
  },
  qty: {
    fontWeight: 700,
  },
}));
