import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import { app } from "../../constants";
import { errorHandler } from "../../helpers";
import MiniLoader from "../../layouts/loader/MiniLoader";

const Users = () => {
  const { token } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    setIsLoading(true);
    axios
      .get(app.BACKEND_URL + "/users/getAll/?token=" + token)
      .then((res) => {
        setTimeout(() => {
          setProducts(res.data.users);
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
    fetchProducts();
  }, []);
  return (
    <div>
      <Row>
        <Col md={12}>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Sales</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-primary">
                    <i className="bi bi-printer" />
                  </button>
                </div>
              </div>
            </CardTitle>
            <CardBody className="">
              {isLoading ? (
                <MiniLoader />
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <th>#</th>
                      <th>Names</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Joined Date</th>
                    </thead>
                    <tbody style={{ borderTopWidth: 0 }}>
                      {products.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.fullName}</td>
                          <td>{item.phone}</td>
                          <td>{item.email}</td>
                          <td>
                            {new Date(item.createdAt).toLocaleDateString()}
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
      </Row>
    </div>
  );
};

export default Users;
