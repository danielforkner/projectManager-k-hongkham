import { useContext } from "react";
import { CustomerContext } from "../context/CustomerContext.jsx";

const useCustomer = () => {
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
    allCustomers,
    setAllCustomers,
    customer,
    setCustomer,
  } = useContext(CustomerContext);

  return {
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
    allCustomers,
    setAllCustomers,
    customer,
    setCustomer,
  };
};

export default useCustomer;
