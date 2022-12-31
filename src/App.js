import React, { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
const FullLayout = lazy(() => import("./layouts/FullLayout.js"));
const Starter = lazy(() => import("./views/Starter.js"));
const About = lazy(() => import("./views/About.js"));
const Alerts = lazy(() => import("./views/ui/Alerts"));
const Badges = lazy(() => import("./views/ui/Badges"));
const Buttons = lazy(() => import("./views/ui/Buttons"));
const Cards = lazy(() => import("./views/ui/Cards"));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route exact path="/" element={<Home />} />
          <Route exact path="/:id" element={<Facility />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/map" element={<Map />} />
          <Route exact path="/confirmation" element={<ConfirmTransport />} />*/}
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
              <Route path="/dashboard/cards" exact element={<Cards />} />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
