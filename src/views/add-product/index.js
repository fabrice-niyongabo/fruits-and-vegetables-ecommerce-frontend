import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardTitle, Col, Row, Spinner } from "reactstrap";
import { app } from "../../constants";
import {
  errorHandler,
  setHeaders,
  toastMessage,
  uploadImage,
} from "../../helpers";
import MiniLoader from "../../layouts/loader/MiniLoader";

const AddProduct = () => {
  const { token } = useSelector((state) => state.user);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("categoryId", categoryId);

    axios
      .post(app.BACKEND_URL + "/products/", formData, setHeaders(token))
      .then((res) => {
        setName("");
        setDescription("");
        setPrice("");
        setCategoryId("");
        setImage("");
        setIsSubmitting(false);
        toastMessage("success", res.data.msg);
      })
      .catch((error) => {
        setIsSubmitting(false);
        errorHandler(error);
      });
  };

  const fetchCategories = () => {
    setIsLoading(true);
    axios
      .get(app.BACKEND_URL + "/categories/")
      .then((res) => {
        setCategories(res.data.categories);
        setIsLoading(false);
      })
      .catch((error) => {
        errorHandler(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>
      <Row>
        <Col md={12}>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              Add New Product
            </CardTitle>
            <CardBody className="">
              <form onSubmit={handleSubmit}>
                {isLoading ? (
                  <MiniLoader />
                ) : (
                  <>
                    <div className="form-group my-2">
                      <input
                        type="text"
                        placeholder="Product Name"
                        className="form-control"
                        required
                        value={name}
                        disabled={isSubmitting}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-group my-2">
                      <select
                        className="form-select"
                        required
                        value={categoryId}
                        disabled={isSubmitting}
                        onChange={(e) => setCategoryId(e.target.value)}
                      >
                        <option value="" disabled>
                          Choose Product Category
                        </option>
                        {categories.map((item, index) => (
                          <option key={index} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group my-2">
                      <input
                        type="number"
                        placeholder="Price in RWF"
                        className="form-control"
                        required
                        value={price}
                        disabled={isSubmitting}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="form-group my-2">
                      <textarea
                        placeholder="Description (optional)"
                        className="form-control"
                        value={description}
                        disabled={isSubmitting}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="form-group my-2">
                      <span>Choose Image</span>
                      <input
                        type="file"
                        className="form-control"
                        required
                        disabled={isSubmitting}
                        onChange={(t) => setImage(t.target.files[0])}
                      />
                    </div>
                    <div className="text-end">
                      <button className="btn btn-primary" type="submit">
                        {isSubmitting && <Spinner size="sm" color="white" />}{" "}
                        Save Product
                      </button>
                    </div>
                  </>
                )}
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddProduct;
