import React, { useState } from "react";

import useAuth from "../hooks/userAuth.js";
import useCustomer from "../hooks/useCustomer.js";

import { useNavigate } from "react-router-dom";

import { createCustomer, getAllCustomers } from "../../axios.js";

const CreateCustomer = ({ setAllCustomers, setAccessCustomers }) => {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const {
    setCompanyName,
    companyName,
    setCompanyRep,
    companyRep,
    setSalesRep,
    salesRep,
    setDescription,
    description,
    needs,
    setNeeds,
    prospectValue,
    setProspectValue,
  } = useCustomer();

  const handleAddingNewCustomer = async (e) => {
    e.preventDefault();
    console.log("adding new customer information - salesRep", salesRep);
    try {
      const response = await createCustomer(
        token,
        companyName,
        companyRep,
        salesRep,
        description,
        needs,
        prospectValue
      );
      console.log("is new customer added to db?", response);
      const newCustomer = await getAllCustomers(token);
      setAllCustomers(newCustomer);
      navigate("/Customers");
      console.log(
        "what is createcustomers new customer function?",
        newCustomer
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <header className="modal-header p-5 pb-4 border-bottom-0">
        <h2 className="fw-bold mb-0">New Customer Information</h2>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => {
            setAccessCustomers(false);
          }}
        ></button>
      </header>
      <div className="modal-body p-5 pt-0">
        <form onSubmit={handleAddingNewCustomer}>
          <div className="form-floating mb-3">
            <input
              className="form-control rounded-4"
              type="text"
              id="newCustomerFormName"
              name="newCustomerFormName"
              placeholder="Customer'sCompanyName"
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
              }}
              required
            />
            <label htmlFor="newCustomerFormName">Company Name: </label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control rounded-4"
              type="text"
              id="newCustomerFormRepName"
              name="newCustomerFormRepName"
              placeholder="Customer's Representative"
              value={companyRep}
              onChange={(e) => {
                setCompanyRep(e.target.value);
              }}
              required
            />
            <label htmlFor="newCustomerFormRepName">
              Company Representative:
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control rounded-4"
              type="text"
              id="newCustomerSalesRep"
              name="newCustomerSalesRep"
              placeholder="OurSalesRepresentative"
              value={salesRep}
              onChange={(e) => {
                setSalesRep(e.target.value);
              }}
              required
            />
            <label htmlFor="newCustomerSalesRep">Sales Representative: </label>
          </div>
          <div className="form-group form-floating mb-3 ">
            <textarea
              className="form-control rounded-4  "
              id="newCustomerDescription"
              name="newCustomerDescription"
              placeholder="What does this company do?"
              rows={10}
              style={{ height: "100px", overflowY: "hidden" }}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            ></textarea>
            {/* <input
              className="form-control rounded-4 "
              type="text"
              id="newCustomerDescription"
              name="newCustomerDescription"
              // placeholder="Description of the customer's company"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            /> */}
            <label htmlFor="newCustomerDescription">Company Description:</label>
          </div>
          <div className="form-group form-floating mb-3 ">
            <textarea
              className="form-control rounded-4  "
              id="newCustomerNeeds"
              name="newCustomerNeeds"
              placeholder="What does this company need?"
              rows={10}
              style={{ height: "100px", overflowY: "hidden" }}
              value={needs}
              onChange={(e) => {
                setNeeds(e.target.value);
              }}
              required
            ></textarea>
            <label htmlFor="newCustomerNeeds">Company Needs:</label>
          </div>
          <div className="form-group form-floating mb-3 ">
            <input
              className="form-control rounded-4"
              type="text"
              id="newCustomerProspectValue"
              name="newCustomerProspectValue"
              placeholder="Our Sale's Representative"
              value={prospectValue}
              onChange={(e) => {
                setProspectValue(e.target.value);
              }}
              required
            />
            <label htmlFor="newCustomerProspectValue">Prospect Value:</label>
          </div>
          <button
            className="w-100 mb-2 btn btn-lg rounded-4 btn-primary"
            type="submit"
          >
            Add New Customer Information
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomer;
