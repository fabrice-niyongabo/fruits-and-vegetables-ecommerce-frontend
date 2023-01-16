import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardBody, CardTitle, Col, Row, Spinner } from "reactstrap";
import { app } from "../../constants";
import Confirmation from "../../controllers/confirmation";
import { errorHandler, toastMessage, uploadImage } from "../../helpers";
import MiniLoader from "../../layouts/loader/MiniLoader";
import Edit from "./edit";

const Alerts = () => {
  const { token } = useSelector((state) => state.user);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [showEdit, setShowEdit] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    uploadImage(image)
      .then((res) => {
        const { fileName } = res.data;
        axios
          .post(app.BACKEND_URL + "/categories/", {
            name,
            image: fileName,
            token,
          })
          .then((response) => {
            setTimeout(() => {
              setName("");
              setImage("");
              setIsSubmitting(false);
              toastMessage("success", "Category has been added successful");
              fetchCategories();
            }, 1000);
          })
          .catch((error) => {
            setTimeout(() => {
              setIsSubmitting(false);
              errorHandler(error);
            }, 1000);
          });
      })
      .catch((error) => {
        setIsSubmitting(false);
        if (error.msg) {
          toastMessage("error", error.msg);
        } else {
          toastMessage("error", error.message);
        }
      });
  };

  const fetchCategories = () => {
    setIsLoading(true);
    axios
      .get(app.BACKEND_URL + "/categories/")
      .then((res) => {
        setTimeout(() => {
          setCategories(res.data.categories);
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

  const handleDelete = () => {
    if (selectedItem._id) {
      setIsDeleting(true);
      axios
        .delete(
          app.BACKEND_URL +
            "/categories/" +
            selectedItem._id +
            "?token=" +
            token
        )
        .then((res) => {
          setTimeout(() => {
            setIsDeleting(false);
            setCategories(
              categories.filter((item) => item._id !== selectedItem._id)
            );
            setSelectedItem({});
          }, 1000);
        })
        .catch((error) => {
          setTimeout(() => {
            errorHandler(error);
            setIsDeleting(false);
          }, 1000);
        });
    }
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
              Product Categories List
            </CardTitle>
            <CardBody className="">
              {isLoading ? (
                <MiniLoader />
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <th>#</th>
                      <th>Image</th>
                      <th>Category Name</th>
                      <th className="text-center">Action</th>
                    </thead>
                    <tbody style={{ borderTopWidth: 0 }}>
                      {categories.map((item, index) => (
                        <tr>
                          <td>{index + 1}</td>
                          <td>
                            <img
                              src={app.FILE_URL + item.image}
                              style={{
                                width: 50,
                                maxHeight: 50,
                                borderRadius: 10,
                              }}
                            />
                          </td>
                          <td>{item.name}</td>
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
                            &nbsp;
                            <button
                              disabled={isDeleting}
                              className="btn btn-danger"
                              onClick={() => {
                                setSelectedItem(item);
                                setShowAlert(true);
                              }}
                            >
                              {isDeleting && selectedItem?._id === item._id && (
                                <Spinner size="sm" color="white" />
                              )}{" "}
                              <i className="bi bi-trash" />
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
              Add New Category
            </CardTitle>
            <CardBody className="">
              <form onSubmit={handleSubmit}>
                <div className="form-group my-2">
                  <input
                    type="text"
                    placeholder="Category Name"
                    className="form-control"
                    required
                    value={name}
                    disabled={isSubmitting}
                    onChange={(e) => setName(e.target.value)}
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
      <Confirmation
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        callback={handleDelete}
        title="Do you want to delete this category?"
      />
      <Edit
        selectedItem={selectedItem}
        showModal={showEdit}
        setShowModal={setShowEdit}
        fetchData={fetchCategories}
      />
    </div>
  );
};

export default Alerts;
