import React from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import useAuth from "../hooks/userAuth.js";
import useCustomer from "../hooks/useCustomer.js";
import { getAllCustomers, updateCustomer } from "../../axios/index.js";

const UpdateCustomer = ({
  editCustomer,
  setEditCustomer,
  customer,
  setAllCustomers,
  allCustomers,
  setAccessCustomers,
}) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const {
    companyName,
    setCompanyName,
    companyRep,
    setCompanyRep,
    salesRep,
    setSalesRep,
    description,
    setDescription,
    needs,
    setNeeds,
    prospectValue,
    setProspectValue,
    setCustomer,
  } = useCustomer();

  const handleUpdateCustomerInfo = async (e) => {
    e.preventDefault();

    const updatedCustomerInfo = await updateCustomer(
      token,
      customer.id,
      companyName,
      companyRep,
      salesRep,
      description,
      needs,
      prospectValue
    );
    console.log("handle update customer", customer.id);
    setCustomer(updatedCustomerInfo);

    const updatedCustomerListing = await getAllCustomers(token);
    setAllCustomers(updatedCustomerListing);
  };

  return (
    <div>
      <header className="modal-header p-5 pb-4 border-bottom-0">
        <h2 className="fw-bold mb-0">
          Update Customer Information{customer.id}
        </h2>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => {
            setEditCustomer(false);
          }}
        ></button>
      </header>
      <div className="modal-body p-5 pt-0">
        <form onSubmit={handleUpdateCustomerInfo}>
          <div className="form-floating mb-3">
            <input
              className="form-control rounded-4"
              type="text"
              id="updateCustomerFormName"
              name="updateCustomerFormName"
              placeholder="Customer'sCompanyName"
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
              }}
              required
            />
            <label htmlFor="updateCustomerFormName">Company Name: </label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control rounded-4"
              type="text"
              id="updateCustomerFormRepName"
              name="updateCustomerFormRepName"
              placeholder="Customer's Representative"
              value={companyRep}
              onChange={(e) => {
                setCompanyRep(e.target.value);
              }}
              required
            />
            <label htmlFor="updateCustomerFormRepName">
              Company Representative:
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control rounded-4"
              type="text"
              id="updateCustomerSalesRep"
              name="updateCustomerSalesRep"
              placeholder="OurSalesRepresentative"
              value={salesRep}
              onChange={(e) => {
                setSalesRep(e.target.value);
              }}
              required
            />
            <label htmlFor="updateCustomerSalesRep">
              Sales Representative:{" "}
            </label>
          </div>
          <div className="form-group form-floating mb-3 ">
            <textarea
              className="form-control rounded-4  "
              id="updateCustomerDescription"
              name="updateCustomerDescription"
              placeholder="What does this company do?"
              rows={10}
              style={{ height: "100px", overflowY: "hidden" }}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              required
            ></textarea>

            <label htmlFor="updateCustomerDescription">
              Company Description:
            </label>
          </div>
          <div className="form-group form-floating mb-3 ">
            <textarea
              className="form-control rounded-4  "
              id="updateCustomerNeeds"
              name="updateCustomerNeeds"
              placeholder="What does this company need?"
              rows={10}
              style={{ height: "100px", overflowY: "hidden" }}
              value={needs}
              onChange={(e) => {
                setNeeds(e.target.value);
              }}
              required
            ></textarea>
            <label htmlFor="updateCustomerNeeds">Company Needs:</label>
          </div>
          <div className="form-group form-floating mb-3 ">
            <input
              className="form-control rounded-4"
              type="text"
              id="updateCustomerProspectValue"
              name="updateCustomerProspectValue"
              placeholder="Our Sale's Representative"
              value={prospectValue}
              onChange={(e) => {
                setProspectValue(e.target.value);
              }}
              required
            />
            <label htmlFor="updateCustomerProspectValue">Prospect Value:</label>
          </div>
          <button
            className="w-100 mb-2 btn btn-lg rounded-4 btn-primary"
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCustomer;
