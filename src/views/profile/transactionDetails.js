import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { app } from "../../constants";
function TransactionDetails({ showModal, setShowModal, transaction }) {
  return (
    <div>
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Transaction details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col">
              <img
                src={app.fileBaseUrl + transaction?.playground?.images[0]}
                className="w-100"
              />
            </div>
            <div className="col border p-2">
              <p className="m-0">
                <b>Playground Name</b> {transaction?.playground?.title}
              </p>
              <p className="m-0">
                <b>Amount Paid </b>
                {transaction.amountPaid} RWF
              </p>
              <p className="m-0">
                <b>Booked Hours: </b>
                <br />
                {transaction?.bookedHours?.map((item, i) => (
                  <p className="m-0" key={i}>
                    {item.from}-{item.to}
                  </p>
                ))}
              </p>
              <p className="m-0 bg-info">
                <b>Booked Date: </b>
                {transaction.bookedDate}
              </p>
              <p className="m-0">
                <b>Transaction ID: </b> {transaction.randomTransactionId}
              </p>
              <p className="m-0">
                <b>MOMO Transaction ID: </b> {transaction?.spTransactionId}
              </p>
              <p className="bg-info">
                <b>Payment Status: </b> {transaction.status}
              </p>
              <p className="m-0">
                <b>Client Name: </b> {transaction?.client?.fullName}
              </p>
              <p className="m-0">
                <b>Client Email: </b> {transaction?.client?.email}
              </p>
              <p>
                <b>Transaction Date: </b>{" "}
                {new Date(transaction.createdAt).toLocaleDateString()}
              </p>

              <Link to={`/print/${transaction._id}`} target="_blank">
                <button className="btn btn-primary">Print Ticket</button>
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default TransactionDetails;
