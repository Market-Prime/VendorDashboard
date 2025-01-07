import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../src/pages/Dashboard";
import Orders from "../src/pages/Orders";
import Products from "../src/pages/Products";

import Profile from "../src/pages/Profile";
import Settings from "../src/pages/Settings";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/products" element={<Products />} />

      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default AppRoutes;
