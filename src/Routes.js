import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Record from "./Record";
import App from "./App";
import "./index.css";
const Rout = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} exact />
        <Route path="/record" element={<Record />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default Rout;
