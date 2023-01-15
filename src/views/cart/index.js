import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { Container } from "reactstrap";
import Header from "../../components/header";
import TopBanner from "../../components/top-banner";
import { appColors } from "../../constants";
import CartItem from "./cart-item";
import Checkout from "./checkout";

function Cart() {
  const classess = useStyles();
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Header />
      <TopBanner title="Cart" />
      <Container className={classess.mainContainer}>
        <table className="table table-bordered">
          <thead className={classess.thead}>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th className="text-center">Total</th>
            <th className="text-center">Delete</th>
          </thead>
          <tbody className={classess.tbody}>
            <CartItem />
          </tbody>
        </table>
        <div
          className={`${classess.subTotalContainer} ${classess.flexSpaceBetween}`}
        >
          <p>Subtotal</p>
          <p>1,000 RWF</p>
        </div>
        <div className="text-end">
          <button className={classess.btn} onClick={() => setShowModal(true)}>
            Checkout
          </button>
        </div>
      </Container>
      <Checkout showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}

export default Cart;

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    paddingTop: "2rem",
    paddingBottom: "2rem",
    "&  .table > :not(:first-child)": {
      borderTop: "0px solid currentColor",
    },
  },

  thead: {
    background: appColors.GREEN,
    color: appColors.WHITE,
    "& th": { padding: "0px 10px" },
  },
  tbody: {
    borderWidth: "1px",
  },
  flexSpaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subTotalContainer: {
    borderBottom: "1px solid #CCC",
  },
  btn: {
    marginTop: 10,
    background: appColors.RED,
    color: appColors.WHITE,
    borderRadius: 15,
    border: 0,
    padding: "5px 1.5rem",
    "&:hover": {
      background: appColors.GREEN,
    },
  },
}));
