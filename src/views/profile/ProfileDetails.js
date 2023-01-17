import React, { useState, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { errorHandler, toastMessage } from "../../helpers";
import { setUserFullName, setUserPhone } from "../../actions/user";
function ProfileDetails({ showModal, setShowModal, setShowLoader }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [phone, setPhone] = useState(user.phone);
  const [fullName, setFullName] = useState(user.fullName);
  const [phoneError, setPhoneError] = useState("");
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [editPassword, setEditPassword] = useState(false);
  const phoneRef = useRef(null);
  useEffect(() => {
    setPhone(user.phone);
    setFullName(user.fullName);
    setNewPwd("");
    setCurrentPwd("");
    setConfirmPwd("");
    setEditPassword(false);
  }, [showModal]);

  const validPhoneCode = ["8", "9", "2", "3"];
  const handleSubmit = (e) => {
    e.preventDefault();
    if (fullName.trim() === "") {
      return;
    }
    if (phone.trim() === "") {
      setPhoneError("Please enter your phone number");
      phoneRef.current.classList.add("is-invalid");
      phoneRef.current.focus();
      return;
    } else if (
      !validPhoneCode.includes(phone[1]) ||
      phone[0] !== "7" ||
      phone.length !== 9
    ) {
      setPhoneError(
        "Invalid phone number. please provide a valid MTN or AIRTEL-TIGO phone number."
      );
      phoneRef.current.classList.add("is-invalid");
      phoneRef.current.focus();
      return;
    } else {
      phoneRef.current.classList.remove("is-invalid");
      setPhoneError("");
    }

    setShowLoader(true);
    Axios.post(process.env.REACT_APP_BACKEND_URL + "/users/editInfo/", {
      phone,
      fullName,
      token: user.token,
    })
      .then((res) => {
        setShowLoader(false);
        setShowModal(false);
        toastMessage("success", "User information updated successful");
        dispatch(setUserFullName(fullName));
        dispatch(setUserPhone(phone));
      })
      .catch((error) => {
        setShowLoader(false);
        errorHandler(error);
      });
  };
  const handleSubmit2 = () => {
    if (newPwd.length <= 4) {
      toastMessage("info", "Password must be more than 4 characters");
    } else if (confirmPwd !== newPwd) {
      toastMessage("info", "Passwords do not match.");
    } else {
      setShowLoader(true);
      Axios.post(process.env.REACT_APP_BACKEND_URL + "/users/updatePassword/", {
        currentPwd,
        newPwd,
        token: user.token,
      })
        .then((response) => {
          setShowLoader(false);
          setShowModal(false);
          toastMessage("success", "Password has been updated successful");
        })
        .catch((error) => {
          setShowLoader(false);
          errorHandler(error);
        });
    }
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
          <Modal.Title>
            {editPassword ? "Change password" : "User profile information"}
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            {editPassword ? (
              <>
                <div className="form-group my-2">
                  <input
                    type="password"
                    placeholder="Current password"
                    className="form-control"
                    required
                    value={currentPwd}
                    onChange={(e) => setCurrentPwd(e.target.value)}
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
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-group my-2">
                  <label>Full names</label>
                  <input
                    type="text"
                    placeholder="Enter your names"
                    className="form-control"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-3 mt-4">
                  <span>Phone number</span>
                  <div className="phone-container">
                    <input
                      type="text"
                      className="form-control"
                      disabled
                      value="+250"
                    />
                    <input
                      type="number"
                      placeholder="7888888"
                      className="form-control"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      ref={phoneRef}
                    />
                  </div>
                  <span className="error">{phoneError}</span>
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
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            {editPassword ? (
              <button
                type="button"
                onClick={() => handleSubmit2()}
                className="btn bg-primary text-white"
              >
                Submit
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setEditPassword(true)}
                  className="btn bg-primary text-white"
                >
                  Change Password
                </button>
                <button type="submit" className="btn bg-info text-white">
                  Save changes
                </button>
              </>
            )}
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default ProfileDetails;
