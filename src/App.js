import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
const FullLayout = lazy(() => import("./layouts/FullLayout.js"));
const Starter = lazy(() => import("./views/Starter.js"));
const Alerts = lazy(() => import("./views/ui/Alerts"));
const Badges = lazy(() => import("./views/ui/Badges"));
const Buttons = lazy(() => import("./views/ui/Buttons"));
const Cart = lazy(() => import("./views/cart"));
const LoginRegister = lazy(() => import("./views/login-register/"));
const Logout = lazy(() => import("./views/logout"));
const ContactUs = lazy(() => import("./views/contact-us/"));
const ProductCategories = lazy(() => import("./views/product-categories"));
const UnProtectedRoute = lazy(() => import("./controllers/un-protected-route"));
// const ProtectedRoute = lazy(() => import("./controllers/protected-route"));
const AdminProtectedRoute = lazy(() =>
  import("./controllers/admin-protected-route")
);

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
            path="/categories/:category"
            element={<ProductCategories />}
          />
          <Route exact path="/contact-us" element={<ContactUs />} />
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
                <Route path="/dashboard/" element={<Starter />} />
                <Route path="/dashboard/starter" exact element={<Starter />} />
                <Route path="/dashboard/alerts" exact element={<Alerts />} />
                <Route path="/dashboard/badges" exact element={<Badges />} />
                <Route path="/dashboard/buttons" exact element={<Buttons />} />
              </>
            }
          />
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="dark" />
    </>
  );
};

export default App;
