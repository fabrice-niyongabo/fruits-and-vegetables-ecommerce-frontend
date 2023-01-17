import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Print from "./views/print/index.js";
const FullLayout = lazy(() => import("./layouts/FullLayout.js"));
const Dashboard = lazy(() => import("./views/dashboard"));
const AdminProfile = lazy(() => import("./views/admin-profile"));
const Alerts = lazy(() => import("./views/ui/Alerts"));
const Cart = lazy(() => import("./views/cart"));
const LoginRegister = lazy(() => import("./views/login-register/"));
const Logout = lazy(() => import("./views/logout"));
const ContactUs = lazy(() => import("./views/contact-us/"));
const Profile = lazy(() => import("./views/profile"));
const ProductCategories = lazy(() => import("./views/product-categories"));
const UnProtectedRoute = lazy(() => import("./controllers/un-protected-route"));
const ProtectedRoute = lazy(() => import("./controllers/protected-route"));
const AdminProtectedRoute = lazy(() =>
  import("./controllers/admin-protected-route")
);
const ProductCats = lazy(() => import("./views/prod-categories"));
const AddProduct = lazy(() => import("./views/add-product"));
const Products = lazy(() => import("./views/products"));
const Users = lazy(() => import("./views/users"));
const DeliveryFees = lazy(() => import("./views/delivery-fees"));

const Home = lazy(() => import("./views/home"));

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/login"
            element={
              <UnProtectedRoute>
                <LoginRegister />
              </UnProtectedRoute>
            }
          />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route
            exact
            path="/print/:id"
            element={
              <ProtectedRoute>
                <Print />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/categories/:category"
            element={<ProductCategories />}
          />
          <Route exact path="/contact-us" element={<ContactUs />} />
          <Route
            exact
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/dashboard"
            element={
              <AdminProtectedRoute>
                <div className="dark">
                  <FullLayout />
                </div>
              </AdminProtectedRoute>
            }
            children={
              <>
                <Route path="/dashboard/" element={<Dashboard />} />
                <Route path="/dashboard/all" exact element={<Alerts />} />
                <Route
                  path="/dashboard/profile"
                  exact
                  element={<AdminProfile />}
                />
                <Route
                  path="/dashboard/productscategories"
                  exact
                  element={<ProductCats />}
                />
                <Route
                  path="/dashboard/addproduct"
                  exact
                  element={<AddProduct />}
                />
                <Route
                  path="/dashboard/products"
                  exact
                  element={<Products />}
                />
                <Route path="/dashboard/users" exact element={<Users />} />
                <Route
                  path="/dashboard/deliveryfees"
                  exact
                  element={<DeliveryFees />}
                />
              </>
            }
          />
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-right" theme="dark" />
    </>
  );
};

export default App;
