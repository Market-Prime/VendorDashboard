import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "../src/pages/Dashboard";
import Orders from "../src/pages/Orders";
import Products from "../src/pages/Products";
import Payment from "../src/pages/Payment";

import Profile from "../src/pages/Profile";
import Settings from "../src/pages/Settings";
import VendorsLogin from "../src/pages/VendorsLogin";
import VendorsAccount from "../src/pages/VendorsAccount";
import Vendoremailconfirmation from "../src/pages/Vendoremailconfirmation";
import SetupKyc from "../src/pages/KycSetup";
import Layout from "../src/components/Layout/layout";
import ProductDetails from "../src/pages/ProductDetails";
import AddProduct from "../src/pages/AddProduct";
import SetupStore from "../src/pages/StoreSetup";
import AccountInfo from "../src/pages/AccountInfo";

const AppRoutes = () => {
    const location = useLocation();

    const noLayoutPattern = /^\/(auth|setup)(\/|$)/;
    const isLayoutRequired = !noLayoutPattern.test(location.pathname);

    return (
        <>
            {isLayoutRequired ? (
                <Layout>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/products" element={<Products />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route
                            path="/product/:id"
                            element={<ProductDetails />}
                        />
                        <Route path="/add-product" element={<AddProduct />} />
                    </Routes>
                </Layout>
            ) : (
                <Routes>
                    <Route path="/auth/login" element={<VendorsLogin />} />
                    <Route path="/auth/signup" element={<VendorsAccount />} />
                    <Route
                        path="/auth/success-signup"
                        element={<AccountInfo />}
                    />
                    <Route
                        path="/auth/confirm-account/:token"
                        element={<Vendoremailconfirmation />}
                    />
                    <Route path="/setup/kyc" element={<SetupKyc />} />
                    <Route path="/setup/store" element={<SetupStore />} />
                </Routes>
            )}
        </>
    );
};

export default AppRoutes;
