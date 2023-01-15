import { useDispatch } from "react-redux";
import Axios from "axios";
import { toast } from "react-toastify";

//custom dispatcher hook
export const useLoadBasicData = () => {
  const dispatch = useDispatch();
  return (payload) => {
    // dispatch(fetchFacility());
  };
};

export const handleAuthError = (error) => {
  if (error?.response?.status == 401) {
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
        if (res.data.type == "success") {
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
  if (type == "info") {
    toast.info(message);
  }
  if (type == "error") {
    toast.error(message);
  }
  if (type == "success") {
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
