import { makeStyles } from "@mui/styles";
import axios from "axios";
import React, { useState, useRef } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import {
  setUserEmail,
  setUserFullName,
  setUserPhone,
  setUserRole,
  setUserToken,
} from "../../redux/actions/user";
import Header from "../../components/header";
import TopBanner from "../../components/top-banner";
import { app, appColors } from "../../constants";
import { errorHandler } from "../../helpers";

const initialRegister = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
};
const initialRegisterError = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
};

const initialLogin = { password: "", email: "" };
function LoginRegister() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerState, setRegisterState] = useState(initialRegister);
  const [registerErrors, setRegisterErrors] = useState(initialRegisterError);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitting2, setIsSubmitting2] = useState(false);
  const [loginState, setLoginState] = useState(initialLogin);

  const fullNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const registerChangeHandler = (e) => {
    setRegisterState({ ...registerState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerState.fullName.trim() === "") {
      setRegisterErrors((prevState) => {
        return { ...prevState, fullName: "Please enter your names" };
      });
      fullNameRef.current.classList.add("is-invalid");
      fullNameRef.current.focus();
      return;
    } else {
      fullNameRef.current.classList.remove("is-invalid");
      setRegisterErrors((prevState) => {
        return { ...prevState, fullName: "" };
      });
    }
    if (registerState.phone.trim() === "") {
      setRegisterErrors((prevState) => {
        return { ...prevState, phone: "Please enter your phone number" };
      });
      phoneRef.current.classList.add("is-invalid");
      phoneRef.current.focus();
      return;
    } else {
      phoneRef.current.classList.remove("is-invalid");
      setRegisterErrors((prevState) => {
        return { ...prevState, phone: "" };
      });
    }
    if (registerState.email.trim() === "") {
      setRegisterErrors((prevState) => {
        return { ...prevState, email: "Please enter your email address" };
      });
      emailRef.current.classList.add("is-invalid");
      emailRef.current.focus();
      return;
    } else {
      emailRef.current.classList.remove("is-invalid");
      setRegisterErrors((prevState) => {
        return { ...prevState, email: "" };
      });
    }
    if (registerState.password.trim() === "") {
      setRegisterErrors((prevState) => {
        return { ...prevState, password: "Please enter password" };
      });
      passwordRef.current.classList.add("is-invalid");
      passwordRef.current.focus();
      return;
    } else if (registerState.password.length <= 4) {
      setRegisterErrors((prevState) => {
        return {
          ...prevState,
          password: "Password must be more than 4 characters",
        };
      });
      passwordRef.current.classList.add("is-invalid");
      passwordRef.current.focus();
      return;
    } else {
      passwordRef.current.classList.remove("is-invalid");
      setRegisterErrors((prevState) => {
        return { ...prevState, password: "" };
      });
    }
    if (registerState.confirmPassword.trim() === "") {
      setRegisterErrors((prevState) => {
        return {
          ...prevState,
          confirmPassword: "Please confirm your password",
        };
      });
      confirmPasswordRef.current.classList.add("is-invalid");
      confirmPasswordRef.current.focus();
      return;
    } else if (registerState.confirmPassword !== registerState.password) {
      setRegisterErrors((prevState) => {
        return {
          ...prevState,
          confirmPassword: "Passwords do not match",
        };
      });
      confirmPasswordRef.current.classList.add("is-invalid");
      confirmPasswordRef.current.focus();
      return;
    } else {
      confirmPasswordRef.current.classList.remove("is-invalid");
      setRegisterErrors((prevState) => {
        return { ...prevState, confirmPassword: "" };
      });
    }

    setIsSubmitting(true);
    //
    axios
      .post(app.BACKEND_URL + "/users/register/", { ...registerState })
      .then((res) => {
        dispatch(setUserFullName(res.data.fullName));
        dispatch(setUserPhone(res.data.phone));
        dispatch(setUserEmail(res.data.email));
        dispatch(setUserRole(res.data.role));
        dispatch(setUserToken(res.data.token));
        setTimeout(() => {
          if (res.data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          setIsSubmitting(false);
          errorHandler(error);
        }, 1000);
      });
    //
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSubmitting2(true);
    //
    axios
      .post(app.BACKEND_URL + "/users/login/", { ...loginState })
      .then((res) => {
        dispatch(setUserFullName(res.data.fullName));
        dispatch(setUserPhone(res.data.phone));
        dispatch(setUserEmail(res.data.email));
        dispatch(setUserRole(res.data.role));
        dispatch(setUserToken(res.data.token));
        setTimeout(() => {
          if (res.data.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          setIsSubmitting2(false);

          errorHandler(error);
        }, 1000);
      });
    //
  };
  return (
    <>
      <Header />
      <TopBanner title="Login / Register" />
      <Container className="my-5">
        <div className={classes.formMainContainer}>
          <Row>
            <Col md={6}>
              <h2>Login</h2>
              <small style={{ color: appColors.TEXT_GRAY }}>
                Welcome to your account
              </small>
              <form onSubmit={handleLogin} autoComplete={false}>
                <div className="form-group mb-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    autoComplete={false}
                    required
                    value={loginState.email}
                    onChange={(e) =>
                      setLoginState({ ...loginState, email: e.target.value })
                    }
                    disabled={isSubmitting2}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="**********************"
                    required
                    autoComplete={false}
                    value={loginState.password}
                    onChange={(e) =>
                      setLoginState({ ...loginState, password: e.target.value })
                    }
                    disabled={isSubmitting2}
                  />
                </div>
                <button
                  type="submit"
                  className={classes.btn}
                  disabled={isSubmitting2}
                  style={{ opacity: isSubmitting2 ? 0.5 : 1 }}
                >
                  {isSubmitting2 && <Spinner size="sm" color="primary" />} Login
                </button>
              </form>
            </Col>
            <Col md={6} className={classes.registeContainer}>
              <h2>Register</h2>
              <small style={{ color: appColors.TEXT_GRAY }}>
                Create new account
              </small>
              <form className={classes.registeForm} onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    placeholder="Enter your names"
                    onChange={(e) => registerChangeHandler(e)}
                    ref={fullNameRef}
                    value={registerState.fullName}
                    disabled={isSubmitting}
                  />
                  {registerErrors.fullName !== "" && (
                    <small className={classes.error}>
                      {registerErrors.fullName}
                    </small>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label>Phone Number *</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Enter phone. Ex: 078........."
                    pattern="07[8,2,3,9]{1}[0-9]{7}"
                    title="Invalid Phone (MTN or Airtel-tigo phone number)"
                    required
                    onChange={(e) => registerChangeHandler(e)}
                    ref={phoneRef}
                    value={registerState.phone}
                    disabled={isSubmitting}
                  />
                  {registerErrors.phone !== "" && (
                    <small className={classes.error}>
                      {registerErrors.phone}
                    </small>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label>Email address *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    ref={emailRef}
                    value={registerState.email}
                    onChange={(e) => registerChangeHandler(e)}
                    disabled={isSubmitting}
                  />
                  {registerErrors.email !== "" && (
                    <small className={classes.error}>
                      {registerErrors.email}
                    </small>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label>Password *</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="**********************"
                    required
                    ref={passwordRef}
                    value={registerState.password}
                    onChange={(e) => registerChangeHandler(e)}
                    disabled={isSubmitting}
                  />
                  {registerErrors.password !== "" && (
                    <small className={classes.error}>
                      {registerErrors.password}
                    </small>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label>Confirm Password *</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="**********************"
                    required
                    ref={confirmPasswordRef}
                    value={registerState.confirmPassword}
                    onChange={(e) => registerChangeHandler(e)}
                    disabled={isSubmitting}
                  />
                  {registerErrors.confirmPassword !== "" && (
                    <small className={classes.error}>
                      {registerErrors.confirmPassword}
                    </small>
                  )}
                </div>
                <div className="text-end">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className={classes.btn}
                    style={{
                      background: appColors.RED,
                      opacity: isSubmitting ? 0.5 : 1,
                    }}
                  >
                    {isSubmitting && <Spinner size="sm" color="primary" />}{" "}
                    Register
                  </button>
                </div>
              </form>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}

export default LoginRegister;

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    background: appColors.GRAY,
    padding: "2rem",
  },
  formMainContainer: {},
  flexSpace: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    border: "none",
    borderRadius: 20,
    padding: "5px 2rem",
    background: appColors.GREEN,
    color: appColors.WHITE,
  },
  registeContainer: {
    borderLeft: "1px solid #CCC",
  },
  registeForm: {
    paddingLeft: "2rem",
    paddingTop: "1rem",
  },
  error: {
    color: appColors.RED,
  },
}));
