import axios from "axios";
import React, { useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardTitle, Spinner } from "reactstrap";
import { app } from "../../constants";
import { errorHandler, toastMessage } from "../../helpers";
import { setUserFullName, setUserPhone } from "../../redux/actions/user";

const AdminProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [phone, setPhone] = useState(user.phone);
  const [fullName, setFullName] = useState(user.fullName);
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const [updatingPwd, setUpdatingPwd] = useState(false);
  const [updatingInfo, setUpdatingInfo] = useState(false);

  const handleSubmit2 = (e) => {
    e.preventDefault();
    if (newPwd.length <= 4) {
      toastMessage("info", "Password must be more than 4 characters");
    } else if (confirmPwd !== newPwd) {
      toastMessage("info", "Passwords do not match.");
    } else {
      setUpdatingPwd(true);
      axios
        .post(app.BACKEND_URL + "/users/updatePassword/", {
          currentPwd,
          newPwd,
          token: user.token,
        })
        .then((response) => {
          setTimeout(() => {
            setUpdatingPwd(false);
            setCurrentPwd("");
            setNewPwd("");
            setConfirmPwd("");
            toastMessage("success", "Password has been updated successful");
          }, 1000);
        })
        .catch((error) => {
          setTimeout(() => {
            setUpdatingPwd(false);
            errorHandler(error);
          }, 1000);
        });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fullName.trim() === "") {
      return;
    }

    setUpdatingInfo(true);
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/users/editInfo/", {
        phone,
        fullName,
        token: user.token,
      })
      .then((res) => {
        setTimeout(() => {
          setUpdatingInfo(false);
          toastMessage("success", "User information updated successful");
          dispatch(setUserFullName(fullName));
          dispatch(setUserPhone(phone));
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          setUpdatingInfo(false);
          errorHandler(error);
        }, 1000);
      });
  };

  return (
    <div>
      <Row>
        <Col md={6}>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Personal Information
            </CardTitle>
            <CardBody className="">
              <form onSubmit={handleSubmit}>
                <div className="form-group my-2">
                  <label>Full names</label>
                  <input
                    type="text"
                    placeholder="Enter your names"
                    className="form-control"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={updatingInfo}
                  />
                </div>
                <div className="form-group my-2">
                  <span>Phone number</span>
                  <input
                    type="text"
                    placeholder="07888888"
                    className="form-control"
                    pattern="07[8,2,3,9]{1}[0-9]{7}"
                    title="Invalid Phone (MTN or Airtel-tigo phone number)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={updatingInfo}
                  />
                </div>
                <div className="form-group my-2">
                  <label>Email address</label>
                  <input
                    type="test"
                    className="form-control"
                    value={user.email}
                    disabled
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={updatingInfo}
                >
                  {updatingInfo && <Spinner size="sm" color="white" />} Save
                </button>
              </form>
            </CardBody>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Change Password
            </CardTitle>
            <CardBody className="">
              <form onSubmit={handleSubmit2}>
                <div className="form-group my-2">
                  <input
                    type="password"
                    placeholder="Current password"
                    className="form-control"
                    required
                    value={currentPwd}
                    onChange={(e) => setCurrentPwd(e.target.value)}
                    disabled={updatingPwd}
                  />
                </div>
                <div className="form-group my-2">
                  <input
                    type="password"
                    placeholder="New password"
                    className="form-control"
                    required
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    disabled={updatingPwd}
                  />
                </div>
                <div className="form-group my-2">
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className="form-control"
                    required
                    value={confirmPwd}
                    onChange={(e) => setConfirmPwd(e.target.value)}
                    disabled={updatingPwd}
                  />
                </div>
                <div className="text-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={updatingPwd}
                  >
                    {updatingPwd && <Spinner size="sm" color="white" />} Update
                    Password
                  </button>
                </div>
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminProfile;
