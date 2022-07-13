import React from "react";
import { Button } from "react-bootstrap";
import useAuth from "../hooks/userAuth.js";

import { deleteCustomer, getAllCustomers } from "../../axios.js";

const DeleteCustomer = ({ customer, setAllCustomers }) => {
  const { token } = useAuth();

  const handleDeleteCustomer = async (e) => {
    e.preventDefault();
    console.log("deletingcustomer", customer.id);
    try {
      const response = await deleteCustomer(token, customer.id);
      const customerList = await getAllCustomers(token);
      setAllCustomers(customerList);
      return response;
    } catch (error) {
      throw error;
    }
  };
  return (
    <div>
      <form onSubmit={handleDeleteCustomer}>
        <Button type="submit" variant="danger">
          Delete Customer
        </Button>
      </form>
    </div>
  );
};

export default DeleteCustomer;
