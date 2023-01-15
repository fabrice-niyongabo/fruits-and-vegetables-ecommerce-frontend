import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../../components/header";
import TopBanner from "../../components/top-banner";
import { appColors } from "../../constants";
import Products from "./products";

function ProductCategories() {
  return (
    <>
      <Header />
      <TopBanner title="Product Categories - All" />
      <Container className="mt-5">
        <Row>
          <Col md={4}>
            <div className="p-3" style={{ background: "#CCC" }}>
              <div>
                <h3 style={{ fontSize: 18 }}>CATEGORIES</h3>
                <div class="form-check form-check-block">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="category"
                    value="all"
                  />
                  <label class="form-check-label">All</label>
                </div>
                <div class="form-check form-check-block">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="category"
                    value="apples"
                  />
                  <label class="form-check-label">Vegetables</label>
                </div>
                <div class="form-check form-check-block">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="category"
                    value="apples"
                  />
                  <label class="form-check-label">Apples</label>
                </div>
              </div>
              <hr />
              <div>
                <h3 style={{ fontSize: 18 }}>SORT BY</h3>
                <div class="form-check form-check-block">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="sort"
                    value="price_asc"
                  />
                  <label class="form-check-label">Price ASC</label>
                </div>
                <div class="form-check form-check-block">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="sort"
                    value="price_desc"
                  />
                  <label class="form-check-label">Price DESC</label>
                </div>
                <div class="form-check form-check-block">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="sort"
                    value="name"
                  />
                  <label class="form-check-label">Name</label>
                </div>
              </div>
            </div>
          </Col>
          <Col md={8}>
            <Products />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductCategories;
