import { makeStyles } from "@mui/styles";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../../components/header";
import TopBanner from "../../components/top-banner";
import { appColors } from "../../constants";

function ContactUs() {
  const classes = useStyles();
  return (
    <>
      <Header />
      <TopBanner title="Contact Us" />
      <Container>
        <div className={classes.formContainer}>
          <Row>
            <Col md={6}>
              <input
                type="text"
                name="names"
                className="form-control mb-3"
                placeholder="Names*"
              />
            </Col>
            <Col md={6}>
              <input
                type="email"
                name="email"
                className="form-control mb-3"
                placeholder="Email address*"
              />
            </Col>
            <Col md={12}>
              <input
                type="text"
                name="subject"
                className="form-control mb-3"
                placeholder="Enter your subject*"
              />
            </Col>
            <Col md={12}>
              <textarea
                className="form-control mb-3"
                placeholder="Enter your message"
              ></textarea>
            </Col>
          </Row>
          <div className="text-center">
            <button type="submit" className={classes.btn}>
              submit
            </button>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ContactUs;

const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: "50%",
    margin: "auto",
    marginTop: "2rem",
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
