import React from "react";
import useAuth from "../hooks/userAuth.js";
import useLogin from "../hooks/useLogin.js";
import { getAllUsers, updateUserInfo } from "../../axios/index.js";

const UpdateContact = ({ userEditModal, setUserEditModal, contact }) => {
  const {
    email,
    firstName,
    lastName,
    department,
    position,
    officeNumber,
    setEmail,
    setFirstName,
    setLastName,
    setDepartment,
    setPosition,
    setOfficeNumber,
  } = useLogin();
  const { token, setAllUsers, setUser } = useAuth();

  const handleUpdateUserInfo = async (e) => {
    e.preventDefault();

    const updatedUserInfo = await updateUserInfo(
      token,
      contact.id,
      email,
      firstName,
      lastName,
      department,
      position,
      officeNumber
    );
    console.log("handle update customer", updateUserInfo);
    setUser(updatedUserInfo);

    const updatedUserListing = await getAllUsers(token);
    setAllUsers(updatedUserListing);
  };

  return (
    <div>
      <header className="modal-header p-5 pb-4 border-bottom-0">
        <h2 className="fw-bold mb-0">Update User Information{contact.id}</h2>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          onClick={() => {
            setUserEditModal(false);
          }}
        ></button>
      </header>
      <div className="modal-body p-5 pt-0">
        <form onSubmit={handleUpdateUserInfo}>
          <div className="form-floating mb-3">
            <input
              className="form-control rounded-4"
              type="text"
              id="updateUserEmail"
              name="updateUserEmail"
              placeholder="User Contact"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <label htmlFor="updateUserEmail">Email:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control rounded-4"
              type="text"
              id="updateUserFirstName"
              name="updateUserFirstName"
              placeholder="Customer's Representative"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              required
            />
            <label htmlFor="updateUserFirstName">First Name:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control rounded-4"
              type="text"
              id="updateUserLastName"
              name="updateUserLastName"
              placeholder="OurSalesRepresentative"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              required
            />
            <label htmlFor="updateUserLastName">Last Name: </label>
          </div>
          <div className="form-group form-floating mb-3 ">
            <input
              className="form-control rounded-4  "
              id="updateUserDepartment"
              name="updateUserDepartment"
              placeholder="What does this company do?"
              rows={10}
              style={{ height: "100px", overflowY: "hidden" }}
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
              required
            ></input>

            <label htmlFor="updateUserDepartment">Department:</label>
          </div>
          <div className="form-floating mb-3 ">
            <input
              className="form-control rounded-4  "
              type="text"
              id="updateUserPosition"
              name="updateUserPosition"
              placeholder="What does this company need?"
              value={position}
              onChange={(e) => {
                setPosition(e.target.value);
              }}
              required
            ></input>
            <label htmlFor="updateUserPosition">Position:</label>
          </div>
          <div className="form-group form-floating mb-3 ">
            <input
              className="form-control rounded-4"
              type="text"
              id="updateUserOfficeNumber"
              name="updateUserOfficeNumber"
              placeholder="Our Sale's Representative"
              value={officeNumber}
              onChange={(e) => {
                setOfficeNumber(e.target.value);
              }}
              required
            />
            <label htmlFor="updateUserOfficeNumber">Office Number:</label>
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

export default UpdateContact;
