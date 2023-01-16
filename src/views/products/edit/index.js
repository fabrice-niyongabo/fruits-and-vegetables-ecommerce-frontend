import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Spinner } from "reactstrap";
import { app } from "../../../constants";
import { errorHandler, toastMessage } from "../../../helpers";
import MiniLoader from "../../../layouts/loader/MiniLoader";

const initilaState = { name: "", price: "", description: "", categoryId: "" };
function Edit({ showModal, setShowModal, selectedItem, fetchData }) {
  const { token } = useSelector((state) => state.user);

  const [state, setState] = useState(initilaState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    axios
      .put(app.BACKEND_URL + "/products/", { ...state, token })
      .then((res) => {
        setTimeout(() => {
          setIsSubmitting(false);
          setShowModal(false);
          toastMessage("success", res.data.msg);
          fetchData();
        }, 1000);
      })
      .catch((error) => {
        setTimeout(() => {
          errorHandler(error);
          setShowModal(false);
        }, 1000);
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
    if (showModal) {
      setState(selectedItem);
      fetchCategories();
    }
  }, [showModal]);
  return (
    <div>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton={!isSubmitting}>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            {isLoading ? (
              <MiniLoader />
            ) : (
              <>
                <div className="form-group mb-2">
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="form-control"
                    required
                    value={state.name}
                    disabled={isSubmitting}
                    onChange={(e) =>
                      setState({ ...state, name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-2">
                  <select
                    className="form-select"
                    required
                    value={state.categoryId}
                    disabled={isSubmitting}
                    onChange={(e) =>
                      setState({ ...state, categoryId: e.target.value })
                    }
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
                <div className="form-group mb-2">
                  <input
                    type="number"
                    placeholder="Price in RWF"
                    className="form-control"
                    required
                    value={state.price}
                    disabled={isSubmitting}
                    onChange={(e) =>
                      setState({ ...state, price: e.target.value })
                    }
                  />
                </div>
                <div className="form-group mb-2">
                  <textarea
                    placeholder="Description (optional)"
                    className="form-control"
                    value={state.description}
                    disabled={isSubmitting}
                    onChange={(e) =>
                      setState({ ...state, description: e.target.value })
                    }
                  />
                </div>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <button type="submit" className="btn btn-primary">
              {isSubmitting && <Spinner size="sm" color="white" />} Save Changes
            </button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default Edit;
