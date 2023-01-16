import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../actions/cart";
import { errorHandler, toastMessage } from "../../helpers";
import Axios from "axios";

function CartItem({ item, setShowLoader, setQuantities, quantities, index }) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [quantity, setQuantity] = useState(item.quantity);
  const handlePlus = () => {
    setQuantity(quantity + 1);
    const qty = quantities.filter((value) => value.index === index);
    if (qty.length === 1) {
      const updated = [...quantities];
      for (let i = 0; i < updated.length; i++) {
        if (updated[i].index === index) {
          updated[i] = { index, value: quantity + 1 };
        }
      }
      setQuantities([...updated]);
    } else {
      setQuantities([...quantities, { index, value: quantity + 1 }]);
    }
  };
  const handleMinus = () => {
    if (quantity - 1 > 0) {
      setQuantity(quantity - 1);
      const qty = quantities.filter((value) => value.index === index);
      if (qty.length === 1) {
        const updated = [...quantities];
        for (let i = 0; i < updated.length; i++) {
          if (updated[i].index === index) {
            updated[i] = { index, value: quantity - 1 };
          }
        }
        setQuantities([...updated]);
      } else {
        setQuantities([...quantities, { index, value: quantity - 1 }]);
      }
    }
  };

  const handleUpdate = () => {
    let data;
    setShowLoader(true);
    if (token && token.trim() !== "") {
      data = {
        quantity,
        id: item._id,
        token,
      };
    } else {
      data = {
        id: item._id,
      };
    }

    Axios.post(process.env.REACT_APP_BACKEND_URL + "/cart/update/", data)
      .then((res) => {
        setShowLoader(false);
        toastMessage("success", res.data.msg);
        dispatch(fetchCart());
      })
      .catch((error) => {
        setShowLoader(false);
        errorHandler(error);
      });
  };

  const handleDelete = () => {
    let data;
    setShowLoader(true);
    if (token && token.trim() !== "") {
      data = {
        quantity,
        id: item._id,
        token,
      };
    } else {
      data = {
        id: item._id,
      };
    }

    Axios.post(process.env.REACT_APP_BACKEND_URL + "/cart/delete/", data)
      .then((res) => {
        setShowLoader(false);
        toastMessage("success", res.data.msg);
        dispatch(fetchCart());
      })
      .catch((error) => {
        setShowLoader(false);
        errorHandler(error);
      });
  };
  return (
    <tr>
      <td>
        <img
          alt={item.menuName}
          src={process.env.REACT_APP_BACKEND_FILE_URL + item.menuImage}
          style={{ width: 300, height: 250, borderRadius: 20 }}
        />
      </td>
      <td>
        <h3 className="m-0">{item.menuName}</h3>
        <p>{item.menuDescription}</p>
      </td>
      <td>
        <p className="text-orange m-0">Price: {item.price} RWF</p>

        <table>
          <tr>
            <td>
              <p className="text-orange m-0">Quantity:</p>
            </td>
            <td>&nbsp;&nbsp;</td>
            <td>
              <button className="btn" onClick={handleMinus}>
                <span className="h4">-</span>
              </button>
            </td>
            <td>&nbsp;&nbsp;</td>
            <td>
              <p className="text-orange m-0">{quantity}</p>
            </td>
            <td>&nbsp;&nbsp;</td>
            <td>
              <button className="btn" onClick={handlePlus}>
                <span className="h4">+</span>
              </button>
            </td>
          </tr>
        </table>
        <p className="text-orange m-0">Total: {quantity * item.price} RWF</p>
      </td>
      <td>
        <button
          className="btn bg-orange text-white d-block mb-3"
          onClick={handleUpdate}
        >
          Update
        </button>
        <button
          className="btn bg-orange text-white d-block"
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default CartItem;
