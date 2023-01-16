import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardTitle, Col, Row, Spinner } from "reactstrap";
import { Districts } from "rwanda";
import { app } from "../../constants";
import { currencyFormatter, errorHandler, toastMessage } from "../../helpers";
import MiniLoader from "../../layouts/loader/MiniLoader";
import Edit from "./edit";

const DeliveryFees = () => {
  const { token } = useSelector((state) => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [showEdit, setShowEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const [type, setType] = useState("District");
  const [value, setValue] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    axios
      .post(app.BACKEND_URL + "/deliveryfees/", {
        type,
        value: type === "District" ? value : "Kilometer",
        amount,
        token,
      })
      .then((response) => {
        setTimeout(() => {
          setAmount("");
          setIsSubmitting(false);
          toastMessage("success", "Item has been added successful");
          fetchCategories();
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          setIsSubmitting(false);
          errorHandler(error);
        }, 1000);
      });
  };

  const fetchCategories = () => {
    setIsLoading(true);
    axios
      .get(app.BACKEND_URL + "/deliveryfees/")
      .then((res) => {
        setTimeout(() => {
          setCategories(res.data.deliveryFees);
          setIsLoading(false);
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          errorHandler(error);
          setIsLoading(false);
        }, 1000);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>
      <Row>
        <Col md={8}>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Delivery Fees
            </CardTitle>
            <CardBody className="">
              {isLoading ? (
                <MiniLoader />
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <th>#</th>
                      <th>Address</th>
                      <th>Amount</th>
                      <th className="text-center">Action</th>
                    </thead>
                    <tbody style={{ borderTopWidth: 0 }}>
                      {categories.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.value}</td>
                          <td>{currencyFormatter(item.amount)} RWF</td>
                          <td className="text-center">
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                setSelectedItem(item);
                                setShowEdit(true);
                              }}
                            >
                              <i className="bi bi-pen" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Add New
            </CardTitle>
            <CardBody className="">
              <form onSubmit={handleSubmit}>
                <div className="form-check form-check-block">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="category"
                    value="District"
                    onClick={() => setType("District")}
                    required
                  />
                  <label className="form-check-label">District</label>
                </div>

                <div className="form-check form-check-block">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="category"
                    value="KM"
                    onClick={() => setType("KM")}
                    required
                  />
                  <label className="form-check-label">Price per KM</label>
                </div>

                {type === "District" && (
                  <div className="form-group my-2">
                    <select
                      className="form-select"
                      required={type === "District"}
                      value={value}
                      disabled={isSubmitting}
                      onChange={(e) => setValue(e.target.value)}
                    >
                      <option value="">Choose Location</option>
                      {Districts("Kigali").map((item, index) => (
                        <option value={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="form-group my-2">
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="form-control"
                    required
                    value={amount}
                    disabled={isSubmitting}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div>
                  <button className="btn btn-primary">
                    {isSubmitting && <Spinner size="sm" color="white" />} Submit
                  </button>
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Edit
        selectedItem={selectedItem}
        showModal={showEdit}
        setShowModal={setShowEdit}
        fetchData={fetchCategories}
      />
    </div>
  );
};

export default DeliveryFees;
