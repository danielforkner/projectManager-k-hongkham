import { axios } from "axios";

export async function getAPIHealth() {
  try {
    const { data } = await axios.get("/api/health");
    return data;
  } catch (error) {
    console.error(error);
    return { healthy: false };
  }
}

export const getMe = async (token) => {
  try {
    const { data } = await axios.get("/api/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("axios - getMe", data);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getCustomer = async (token) => {
  try {
    const { data } = await axios.get(`/api/customers/current`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("axios - getCustomer", data);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (email, password) => {
  try {
    const { data } = await axios.post(`/api/users/login`, {
      email,
      password,
    });

    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export async function getUserByEmail(token, email) {
  try {
    const { data } = await axios.get(`/api/users/${email}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    throw error.response.data;
  }
}

export const getAllUsers = async (token) => {
  try {
    const { data } = await axios.get(`/api/users/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllCustomers = async (token) => {
  try {
    const { data } = await axios.get(`/api/customers/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("attempting to get all customers from axios", data);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const registerUser = async (
  email,
  password,
  firstName,
  lastName,
  department
) => {
  try {
    const { data } = await axios.post("/api/users/register", {
      email,
      password,
      firstName,
      lastName,
      department,
    });
    console.log("attempting to register", data);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createCustomer = async (
  token,
  companyName,
  companyRep,
  salesRep,
  description,
  needs,
  prospectValue
) => {
  try {
    const response = await axios.post(
      `api/customers`,
      {
        companyName,
        companyRep,
        salesRep,
        description,
        needs,
        prospectValue,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(
      "is axios adding the new customer? -createCustomer",
      response.data
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateCustomer = async (
  token,
  customerId,
  companyName,
  companyRep,
  salesRep,
  description,
  needs,
  prospectValue
) => {
  try {
    const { data } = await axios.patch(
      `
    api/customers/${customerId}`,
      {
        companyName,
        companyRep,
        salesRep,
        description,
        needs,
        prospectValue,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("axios - updateCustomer - response", data);

    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteCustomer = async (token, customerId) => {
  try {
    const { data } = await axios.delete(`api/customers/${customerId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("axios - delete Customer", data);
    console.log("axios - delete Customer - customerId", customerId);
    return data;
  } catch (error) {
    throw error;
  }
};

export const updateUserInfo = async (
  token,
  userId,
  email,
  firstName,
  lastName,
  department,
  position,
  officeNumber
) => {
  try {
    const { data } = await axios.patch(
      `
  api/users/${userId}
  `,
      {
        email,
        firstName,
        lastName,
        department,
        position,
        officeNumber,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("axios -updateUser", data);
    return data;
  } catch (error) {
    throw error.response.data;
  }
};
