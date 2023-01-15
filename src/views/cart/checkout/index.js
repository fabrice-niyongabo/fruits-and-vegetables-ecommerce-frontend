import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { Accordion, Col, Modal, Row } from "react-bootstrap";
import { appColors } from "../../../constants";

function Checkout({ showModal, setShowModal }) {
  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6} className={classes.container}>
                <div>
                  <h4>
                    <i className="bi bi-geo-alt" /> Delivery Address
                  </h4>
                  <Accordion>
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
                  </Accordion>
                </div>

                <div className="mt-3">
                  <h4>
                    <i className="bi  bi-bicycle" /> Delivery Fees
                  </h4>
                  <input type="radio" name="fees" /> Charges By Location
                  <br />
                  <input type="radio" name="fees" /> Charges By Kilometers
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
                    />
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <h3>Order Details</h3>
                <div className={classes.orderRow}>
                  <span>Sub Total</span>
                  <b>1,000 RWF</b>
                </div>
                <div className={classes.orderRow}>
                  <span>Delivery Fees</span>
                  <b>500 RWF</b>
                </div>
                <div className={classes.orderRow}>
                  <span>Grand Total</span>
                  <b>1,500 RWF</b>
                </div>
                <div className="mt-3 text-center">
                  <button className={classes.btn}>Pay Now</button>
                </div>
              </Col>
            </Row>
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
