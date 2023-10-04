import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import Header from "../../components/header";
import TopBanner from "../../components/top-banner";
import { appColors } from "../../constants";
import { currencyFormatter, toastMessage } from "../../helpers";
import MiniLoader from "../../layouts/loader/MiniLoader";
import CartItem from "./cart-item";
import Checkout from "./checkout";
import { fetchCart } from "../../redux/actions/cart";

function Cart() {
  const { loading, cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const classess = useStyles();
  const [showModal, setShowModal] = useState(false);
  const [quantities, setQuantities] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  const calculateTotal = () => {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      if (quantities.length > 0) {
        const qty = quantities.filter((value) => value.index === i);
        if (qty.length === 1) {
          total += cart[i].price * qty[0].value;
        } else {
          total += cart[i].price;
        }
      } else {
        total += cart[i].price;
      }
    }
    return total;
  };

  useEffect(() => {
    const total = calculateTotal();
    setCartTotal(total);
  }, [cart]);

  return (
    <>
      <Header />
      <TopBanner title="Cart" />
      <Container className={classess.mainContainer}>
        {loading && cart.length === 0 ? (
          <MiniLoader />
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className={classess.thead}>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th className="text-center">Total</th>
                  <th className="text-center">Action</th>
                </thead>
                <tbody className={classess.tbody}>
                  {cart.map((item, index) => (
                    <CartItem
                      key={index}
                      item={item}
                      index={index}
                      quantities={quantities}
                      setQuantities={setQuantities}
                    />
                  ))}
                </tbody>
              </table>
            </div>
            {cartTotal > 0 && (
              <>
                <div
                  className={`${classess.subTotalContainer} ${classess.flexSpaceBetween}`}
                >
                  <p>Subtotal</p>
                  <p>{currencyFormatter(cartTotal)} RWF</p>
                </div>
                <div className="text-end">
                  <button
                    className={classess.btn}
                    onClick={() => {
                      if (token.trim() !== "") {
                        setShowModal(true);
                      } else {
                        toastMessage(
                          "error",
                          "You must login before checking out"
                        );
                        navigate("/login");
                      }
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </Container>
      <Checkout
        showModal={showModal}
        cartTotal={cartTotal}
        setShowModal={setShowModal}
      />
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
