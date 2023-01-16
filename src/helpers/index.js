import { useDispatch } from "react-redux";
import Axios from "axios";
import { toast } from "react-toastify";
import { fetchCategories } from "../actions/categories";
import { fetchProducts } from "../actions/products";
import { fetchCart } from "../actions/cart";

//custom dispatcher hook
export const useLoadBasicData = () => {
  const dispatch = useDispatch();
  return (payload) => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
    dispatch(fetchCart());
  };
};

export const handleAuthError = (error) => {
  if (error?.response?.status === 401) {
    window.location = "/logout";
  }
};

export const randomNumber = () => {
  const max = 99999;
  const min = 11111;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const uploadImage = (file) => {
  console.log(file);
  return new Promise((resolve, reject) => {
    let formData = new FormData();
    formData.append("file", file, file.name);
    Axios.post(process.env.REACT_APP_BACKEND_FILE_UPLOAD_URL, formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.type === "success") {
          resolve({ data: { fileName: res.data.fileName } });
        } else {
          reject(res.data.msg);
        }
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};

export const toastMessage = (type, message) => {
  if (type === "info") {
    toast.info(message);
  }
  if (type === "error") {
    toast.error(message);
  }
  if (type === "success") {
    toast.success(message);
  }
};

export const errorHandler = (error) => {
  if (error?.response?.data?.msg) {
    toastMessage("error", error.response.data.msg);
  } else {
    toastMessage("error", error.message);
  }
  handleAuthError(error);
};

export const fetchCoordinates = () => {
  return new Promise((resolve, reject) => {
    try {
      navigator.geolocation.getCurrentPosition(function (position) {
        // console.log("lt is :", position.coords.latitude);
        // console.log("lg is :", position.coords.longitude);
        resolve({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};
const toRadians = (degree) => {
  return (degree * Math.PI) / 180;
};
export const calCulateDistance = (
  latitude1,
  longitude1,
  latitude2,
  longitude2
) => {
  var R = 6371;
  var deltaLatitude = toRadians(latitude2 - latitude1);
  var deltaLongitude = toRadians(longitude2 - longitude1);
  latitude1 = toRadians(latitude1);
  latitude2 = toRadians(latitude2);
  var a =
    Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
    Math.cos(latitude1) *
      Math.cos(latitude2) *
      Math.sin(deltaLongitude / 2) *
      Math.sin(deltaLongitude / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};

export const currencyFormatter = (num) => {
  if (
    isNaN(num) ||
    num === undefined ||
    num === null ||
    typeof num === "undefined"
  ) {
    // throw new Error(`currencyFormatter Failed,not a NUM`)
    // console.log("Num:-", num)
    return "";
  }
  // console.log("Num:-", num)
  let sign = "";
  if (num < 0) {
    sign = "-";
  }
  const str = Math.abs(num).toString();
  let lastComma = 0;
  let lastDot = str.lastIndexOf(".");
  if (lastDot == -1) {
    lastComma = str.length - 4;
  } else {
    lastComma = lastDot - 4;
  }

  // console.log(lastComma);
  let newStr = "";
  for (let i = str.length - 1; i >= 0; i--) {
    if (i == lastComma) {
      newStr = "," + newStr;
      lastComma -= 2;
    }

    newStr = str[i] + newStr;
  }
  if (sign === "-") {
    newStr = sign + newStr;
  }
  if (newStr.includes("e")) {
    return exponentialToFixed(newStr);
  }
  return newStr;
};

function exponentialToFixed(x) {
  if (Math.abs(+x) < 1.0) {
    let e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    let e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  return x;
}
