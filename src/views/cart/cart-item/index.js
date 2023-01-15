import { makeStyles } from "@mui/styles";
import React from "react";
import { app, appColors } from "../../../constants";

function CartItem() {
  const classess = useStyles();
  return (
    <tr>
      <td>
        <div className={classess.flexSpace}>
          <img
            src={`${app.PUBLIC_URL}/assets/images/banana.png`}
            alt=""
            className={classess.productImage}
          />
          <p className={classess.productTitle}>Banana</p>
        </div>
      </td>
      <td>1,000 RWF</td>
      <td>
        <div
          className={`${classess.flexSpaceBetween} ${classess.qtyContainer}`}
        >
          <div className={classess.btn}>-</div>
          <span className={classess.qty}>1</span>
          <div className={classess.btn}>+</div>
        </div>
      </td>
      <td style={{ color: appColors.GREEN, textAlign: "center" }}>1,000 RWF</td>
      <td className="text-center">
        <i className="bi bi-trash" />
      </td>
    </tr>
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
