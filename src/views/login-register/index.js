import { makeStyles } from "@mui/styles";
import React from "react";
import { Col, Container, Row } from "reactstrap";
import Header from "../../components/header";
import TopBanner from "../../components/top-banner";
import { appColors } from "../../constants";

function LoginRegister() {
  const classes = useStyles();
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
              <form>
                <div className="form-group mb-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Password</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="**********************"
                    required
                  />
                </div>
                <button className={classes.btn}>Login</button>
              </form>
            </Col>
            <Col md={6} className={classes.registeContainer}>
              <h2>Register</h2>
              <small style={{ color: appColors.TEXT_GRAY }}>
                Create new account
              </small>
              <form className={classes.registeForm}>
                <div className="form-group mb-3">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-control"
                    placeholder="Enter your names"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Phone Number *</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="Enter phone. Ex: 078........."
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Email address *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Password *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="**********************"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Confirm Password *</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="**********************"
                    required
                  />
                </div>
                <div className="text-end">
                  <button
                    className={classes.btn}
                    style={{ background: appColors.RED }}
                  >
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
}));
