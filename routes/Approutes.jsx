import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "../src/pages/Dashboard";
import Orders from "../src/pages/Orders";
import Products from "../src/pages/Products";

import Profile from "../src/pages/Profile";
import Settings from "../src/pages/Settings";
import VendorsLogin from "../src/pages/VendorsLogin";
import VendorsAccount from "../src/pages/VendorsAccount";
import Vendoremailconfirmation from "../src/pages/Vendoremailconfirmation";
import FinalSection from "../src/pages/FinalSection";
import Layout from "../src/components/Layout/layout";
import ProductDetails from "../src/pages/ProductDetails";
import AddProduct from "../src/pages/AddProduct";
import AccountInfo from "../src/pages/AccountInfo";

const AppRoutes = () => {

  const location = useLocation();

  const token = localStorage.getItem("vendorToken");

  const noLayoutPage = ["/", "/vendoraccount", "/vendor-email-confirmation/token", "/finalsection", "/confirmeaccount"];

  const isLayoutRequired = !noLayoutPage.includes(location.pathname);
  return (
    <>
      {isLayoutRequired ? (
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
      
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/add-product" element={<AddProduct />}  />
          </Routes>
        </Layout>

      ) : (
          <Routes>
             <Route path="/" element={<VendorsLogin />} />
             <Route path="/vendoraccount" element={<VendorsAccount />} />
             <Route path="/confirmeaccount" element={<AccountInfo/>} />
             <Route path="/vendor-email-confirmation/token" element={<Vendoremailconfirmation />} />
             <Route path="/finalsection" element={<FinalSection />} />
          </Routes>
         
      )}
    </>

  );

};

export default AppRoutes;
