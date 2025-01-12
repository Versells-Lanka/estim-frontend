import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Calculator from "./Calculator";
import ItemDetails from "./ItemDescription";
import ManageCustomer from "./ManageCustomer";
import Searched_invoice from "./component/Searched_invoice";
import Login from "./login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Calculator />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="/manage_customer" element={<ManageCustomer/>}/>
        <Route path="/customer_Invoice/:id" element={<Searched_invoice />} />
        <Route path="/" element={<Login/>}/>
      </Routes>
    </Router>
  );
};

export default App;
