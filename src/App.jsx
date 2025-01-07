import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "../routes/Approutes";
import Layout from "./components/Layout/layout";

function App() {
  return (
    <Router>
      <Layout>
        <AppRoutes />
      </Layout>
    </Router>
  );
}

export default App;
