import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import ProfileDetails from "./ProfileDetails";
import { Link, useParams } from "react-router-dom";
import { app } from "../../constants";
import TransactionDetails from "./transactionDetails";
import MiniLoader from "../../layouts/loader/MiniLoader";
import Header from "../../components/header";
import { currencyFormatter, errorHandler, toastMessage } from "../../helpers";
import TopBanner from "../../components/top-banner";
function Profile() {
  const params = useParams();
  const { fullName, token } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("PENDING");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({});

  const fetchData = () => {
    setIsLoading(true);
    Axios.get(app.BACKEND_URL + "/orders/" + "?token=" + token)
      .then((res) => {
        console.log(res.data.orders);
        setIsLoading(false);
        setTransactions(res.data.orders);
        toastMessage("success", res.data.msg);
      })
      .catch((error) => {
        setIsLoading(false);
        errorHandler(error);
      });
  };

  const fetchData2 = () => {
    Axios.get(app.BACKEND_URL + "/orders/" + "?token=" + token)
      .then((res) => {
        setTransactions(res.data.orders);
      })
      .catch((error) => {
        errorHandler(error);
      });
  };

  let interval = null;
  useEffect(() => {
    interval = setInterval(() => {
      if (transactions.length > 0) {
        fetchData2();
      }
    }, 7000);
    return () => {
      clearInterval(interval);
    };
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <TopBanner title="My Profile" />
      <div className="container">
        <div className="text-end mt-4">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <h3 className="quicksand-font mb-0">{fullName}</h3>
            <span>&nbsp;&nbsp;</span>
            <i
              className="bi bi-pen"
              size={30}
              color="#f46a06"
              style={{ cursor: "pointer" }}
              onClick={() => setShowModal(true)}
            />
          </div>
        </div>
        <div className="my-4">
          <table className="w-100">
            <tr>
              <td colSpan={3} className="bg-light pt-2">
                <h4 className="text-center">Transactions</h4>
              </td>
            </tr>
            <tr>
              <td
                style={{ cursor: "pointer" }}
                className={
                  activeTab === "PENDING"
                    ? "tab p-2 text-center bg-light active"
                    : "tab p-2 text-center bg-light"
                }
                onClick={() => setActiveTab("PENDING")}
              >
                Pending (
                {
                  transactions.filter((item) => item.status === "PENDING")
                    .length
                }
                )
              </td>
              <td
                style={{ cursor: "pointer" }}
                className={
                  activeTab === "FAILED"
                    ? "tab p-2 text-center bg-light active"
                    : "tab p-2 text-center bg-light"
                }
                onClick={() => setActiveTab("FAILED")}
              >
                Failed (
                {transactions.filter((item) => item.status === "FAILED").length}
                )
              </td>
              <td
                style={{ cursor: "pointer" }}
                className={
                  activeTab === "SUCCESS"
                    ? "tab p-2 text-center bg-light active"
                    : "tab p-2 text-center bg-light"
                }
                onClick={() => setActiveTab("SUCCESS")}
              >
                Successfull (
                {
                  transactions.filter((item) => item.status === "SUCCESS")
                    .length
                }
                )
              </td>
            </tr>
          </table>
          <div>
            {isLoading ? (
              <MiniLoader />
            ) : (
              <table className="table table-bordered">
                <thead>
                  <th>#</th>
                  <th>OrderID</th>
                  <th>Delivery Address</th>
                  <th>Delivery Fees</th>
                  <th>Total Items</th>
                  <th>Total Amount</th>
                  <th>Payment Status</th>
                  <th>Transaction Date</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  {transactions
                    .filter((item) => item.status === activeTab)
                    .map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.orderId}</td>
                        <td>{item.deliveryDescription}</td>
                        <td>{currencyFormatter(item.deliveryAmount)} RWF</td>
                        <td>{item.products.length}</td>
                        <td>{currencyFormatter(item.totalAmount)} RWF</td>
                        <td>{item.status}</td>
                        <td>{new Date(item.date).toLocaleString()}</td>
                        <td>
                          <Link to={`/print/${item._id}`} target="_blank">
                            <button
                              className="btn btn-info"
                              onClick={() => {
                                // setSelectedTransaction(item);
                                // setShowModal2(true);
                              }}
                            >
                              <i className="bi bi-printer" />
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <ProfileDetails
        setShowLoader={setShowLoader}
        setShowModal={setShowModal}
        showModal={showModal}
      />
      <TransactionDetails
        showModal={showModal2}
        setShowModal={setShowModal2}
        transaction={selectedTransaction}
      />
    </>
  );
}

export default Profile;
