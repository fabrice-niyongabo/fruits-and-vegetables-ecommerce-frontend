import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { Accordion, Col, Modal, Row } from "react-bootstrap";
import { app, appColors } from "../../../constants";
import { Districts } from "rwanda";
import {
  calCulateDistance,
  currencyFormatter,
  errorHandler,
  fetchCoordinates,
  toastMessage,
} from "../../../helpers";
import MiniLoader from "../../../layouts/loader/MiniLoader";
import axios from "axios";
import { Spinner } from "reactstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const initilaState = {
  deliveryLocation: "",
  deliveryDescription: "",
  chargesType: "",
  deliveryAmount: "",
  phoneNumber: "",
};
function Checkout({ showModal, setShowModal, cartTotal }) {
  const navigate = useNavigate();

  const classes = useStyles();
  const { token } = useSelector((state) => state.user);
  const [state, setState] = useState(initilaState);
  const [km, setKm] = useState(0);
  const [kmFees, setKmFees] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryFees, setDeleiveryFees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    axios
      .post(app.BACKEND_URL + "/orders/", { ...state, cartTotal, token })
      .then((res) => {
        setIsSubmitting(false);
        setState(initilaState);
        setShowModal(false);
        toastMessage("success", res.data.msg);
        navigate("/profile");
      })
      .catch((error) => {
        errorHandler(error);
        setIsSubmitting(false);
      });
  };

  const fetchFees = () => {
    setIsLoading(true);
    axios
      .get(app.BACKEND_URL + "/deliveryfees/")
      .then((res) => {
        setDeleiveryFees(res.data.deliveryFees);
        setIsLoading(false);
        if (res.data.deliveryFees.length > 0) {
          setState({
            ...state,
            deliveryLocation: res.data.deliveryFees[0].value,
          });
        }
      })
      .catch((error) => {
        errorHandler(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchFees();
  }, []);

  useEffect(() => {
    if (state.chargesType === "km") {
      fetchCoordinates()
        .then((res) => {
          const distance = calCulateDistance(
            -1.9496163379320075,
            30.126168324630534,
            res.lat,
            res.long
          );
          setKm(distance.toFixed(2));
          const deliveryAm = deliveryFees.find((item) => item.type === "KM");
          if (deliveryAm) {
            setKmFees(deliveryAm.amount);
          } else {
            setKmFees(500);
          }
        })
        .catch((error) => {
          console.log("errr", error);
          setState({ ...state, deliveryAmount: "" });
          toastMessage(
            "error",
            "Failed to get your current location. This is because you have not granted us permision to get your current loaction or the location is turned off on you device. Please fix this issue an try again later."
          );
        });
    } else {
      const deliveryAm = deliveryFees.find(
        (item) => item.value === state.deliveryLocation
      );
      if (deliveryAm) {
        setState({ ...state, deliveryAmount: deliveryAm.amount });
      } else {
        setState({ ...state, deliveryAmount: 500 });
      }
    }
  }, [state.chargesType, state.deliveryLocation]);

  useEffect(() => {
    const dis = km > 0 ? km : 1;
    setState({ ...state, deliveryAmount: dis * kmFees });
  }, [km, kmFees]);

  return (
    <div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton={!isSubmitting}>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            {isLoading ? (
              <MiniLoader />
            ) : (
              <Row>
                <Col md={6} className={classes.container}>
                  <div>
                    <h4>
                      <i className="bi bi-geo-alt" /> Delivery Address
                    </h4>
                    {/* <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Saved Addresses</Accordion.Header>
                      <Accordion.Body>
                        Lorem ipsum dolor sit amet,
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>New Address</Accordion.Header>
                      <Accordion.Body>New address form</Accordion.Body>
                    </Accordion.Item>
                  </Accordion> */}
                    <div className="bg-light p-3" style={{ borderRadius: 10 }}>
                      <div className="form-group my-2">
                        <label>Choose Delivery Location</label>
                        <select
                          className="form-select"
                          required
                          value={state.deliveryLocation}
                          disabled={isSubmitting}
                          onChange={(e) =>
                            setState({
                              ...state,
                              deliveryLocation: e.target.value,
                            })
                          }
                        >
                          {Districts("Kigali").map((item, index) => (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="form-group my-2">
                        <label>Full address & description</label>
                        <textarea
                          required
                          disabled={isSubmitting}
                          className="form-control"
                          placeholder="Include the street number and other details which leads to your address"
                          onChange={(e) =>
                            setState({
                              ...state,
                              deliveryDescription: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <h4>
                      <i className="bi  bi-bicycle" /> Delivery Fees
                    </h4>
                    <input
                      required
                      type="radio"
                      name="fees"
                      onClick={() =>
                        setState({ ...state, chargesType: "location" })
                      }
                    />
                    &nbsp; Charges By Location
                    <br />
                    <input
                      required
                      type="radio"
                      name="fees"
                      onClick={() => setState({ ...state, chargesType: "km" })}
                    />
                    &nbsp; Charges By Kilometers
                  </div>

                  <div className="bg-light text-center my-4">
                    <p>Payment Method</p>
                  </div>
                  <div>
                    <input type="radio" checked /> Mobile Money
                    <div className="form-group my-2">
                      <label>Mobile Number</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter MOMO number to pay with"
                        pattern="07[8,2,3,9]{1}[0-9]{7}"
                        title="Invalid Phone (MTN or Airtel-tigo phone number)"
                        required
                        disabled={isSubmitting}
                        value={state.phoneNumber}
                        onChange={(e) =>
                          setState({ ...state, phoneNumber: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <h3>Order Details</h3>
                  <div className={classes.orderRow}>
                    <span>Sub Total</span>
                    <b>{currencyFormatter(cartTotal)} RWF</b>
                  </div>
                  <div className={classes.orderRow}>
                    <span>Delivery Fees</span>
                    {state.chargesType === "km" && (
                      <small>
                        {km} KM * {currencyFormatter(kmFees)} RWF =
                      </small>
                    )}
                    <b>{currencyFormatter(state.deliveryAmount)} RWF</b>
                  </div>
                  <div className={classes.orderRow}>
                    <span>Grand Total</span>
                    <b>
                      {currencyFormatter(
                        Number(state.deliveryAmount) + Number(cartTotal)
                      )}{" "}
                      RWF
                    </b>
                  </div>
                  <div className="mt-3 text-center">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className={classes.btn}
                    >
                      {isSubmitting && <Spinner size="sm" color="white" />} Pay
                      Now
                    </button>
                  </div>
                </Col>
              </Row>
            )}
          </Modal.Body>
        </form>
      </Modal>
    </div>
  );
}

export default Checkout;

const useStyles = makeStyles((theme) => ({
  container: {
    borderRight: "1px solid #CCC",
    // [theme.breakpoints.down("sm")]: {
    //   border: "none",
    // },
  },
  orderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #CCC",
    padding: 5,
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
