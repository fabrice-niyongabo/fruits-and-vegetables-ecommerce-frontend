import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { app, appColors } from "../../constants";
import Axios from "axios";
import MiniLoader from "../../layouts/loader/MiniLoader";
import { errorHandler } from "../../helpers";

function Print() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [transaction, setTransaction] = useState({});
  const { fullName, token } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.products);
  const { id } = params;

  const getProductName = (item) => {
    let name = "";
    const pr = products.find((i) => i._id === item.productId);
    if (pr) {
      name = pr.name;
    }
    return name;
  };

  const getProductImage = (item) => {
    let image = "";
    const pr = products.find((i) => i._id === item.productId);
    if (pr) {
      image = app.FILE_URL + pr.image;
    }
    return image;
  };

  useEffect(() => {
    Axios.get(app.BACKEND_URL + "/orders/" + id + "?token=" + token)
      .then((res) => {
        setTransaction(res.data?.orders[0]);
        setIsLoading(false);
        setTimeout(() => {
          window.print();
        }, 1500);
      })
      .catch((error) => {
        errorHandler(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="mt-5 pt-5">
          <MiniLoader />
        </div>
      ) : (
        <div
          style={{ width: "60%", marginLeft: "auto", marginRight: "auto" }}
          className="border p-3"
        >
          <div className="text-center">
            <span className="h1 m-0 p-0" style={{ cursor: "pointer" }}>
              O<span style={{ color: appColors.RED }}>F</span>&
              <span style={{ color: appColors.GREEN }}>V</span>M
            </span>
          </div>
          <h2 className="text-center">
            CYIZERE FRUITS COMPANY LTD <br /> - Transaction Details -
          </h2>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>
                  <b>ORDER ID</b>
                </td>
                <td>{transaction.orderId}</td>
              </tr>
              <tr>
                <td>
                  <b>Products</b>
                </td>
                <td>
                  <table>
                    <tbody>
                      {transaction?.products?.map((item, index) => (
                        <tr key={index}>
                          <td>{getProductName(item)}</td>
                          <td>{item.quantity}</td>
                          <td>x</td>
                          <td>{item.price} RWF</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <b>Delivery location</b>
                </td>
                <td>{transaction.deliveryDescription}</td>
              </tr>
              <tr>
                <td>
                  <b>Delivery Amount</b>
                </td>
                <td>{transaction.deliveryAmount}</td>
              </tr>
              <tr>
                <td>
                  <b>Payment Status</b>
                </td>
                <td>{transaction.status}</td>
              </tr>
              <tr>
                <td>
                  <b>Total</b>
                </td>
                <td>{transaction.totalAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Print;
