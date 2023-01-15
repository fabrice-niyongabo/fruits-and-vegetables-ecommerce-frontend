import React, { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const FullLayout = lazy(() => import("./layouts/FullLayout.js"));
const Starter = lazy(() => import("./views/Starter.js"));
const About = lazy(() => import("./views/About.js"));
const Alerts = lazy(() => import("./views/ui/Alerts"));
const Badges = lazy(() => import("./views/ui/Badges"));
const Buttons = lazy(() => import("./views/ui/Buttons"));
const Cart = lazy(() => import("./views/cart"));
const LoginRegister = lazy(() => import("./views/login-register/"));
const ContactUs = lazy(() => import("./views/contact-us/"));

const Home = lazy(() => import("./views/home"));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<LoginRegister />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/contact-us" element={<ContactUs />} />
        <Route
          exact
          path="/dashboard"
          element={
            <div className="dark">
              <FullLayout />
            </div>
          }
          children={
            <>
              <Route path="/dashboard/" element={<Starter />} />
              <Route path="/dashboard/starter" exact element={<Starter />} />
              <Route path="/dashboard/about" exact element={<About />} />
              <Route path="/dashboard/alerts" exact element={<Alerts />} />
              <Route path="/dashboard/badges" exact element={<Badges />} />
              <Route path="/dashboard/buttons" exact element={<Buttons />} />
            </>
          }
        />
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
