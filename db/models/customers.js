import client from "../client.js";

export async function createCustomer({
  companyName,
  companyRep,
  salesRep,
  description,
  needs,
  prospectValue,
}) {
  try {
    const {
      rows: [customer],
    } = await client.query(
      `
        INSERT INTO customers("companyName", "companyRep", "salesRep", description, needs, "prospectValue")
        VALUES($1,$2,$3,$4,$5,$6) 
        RETURNING *;
        `,
      [companyName, companyRep, salesRep, description, needs, prospectValue]
    );
    console.log("new customer through db - createCustomer", customer);
    return customer;
  } catch (error) {
    throw error;
  }
}

export async function getAllCustomers() {
  try {
    const { rows } = await client.query(`
    SELECT 
    customers.id AS id, 
    customers."companyName" AS "CompanyName",
    customers."companyRep" AS "CompanyRep",
    customers."salesRep" AS "SalesRep",
    customers.description AS "Description",
    customers.needs AS "CustomerNeeds",
    customers."prospectValue" AS "ProspectValue"
    FROM customers 
    ORDER BY  customers.id desc
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

export async function updateCustomer(fields = {}) {
  const setString = Object.keys(fields)
    .map((key, idx) => `"${key}"=$${idx + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [customer],
    } = await client.query(
      `
    UPDATE customers
    SET ${setString}
    WHERE id =${fields.id}
    RETURNING*;
    `,
      Object.values(fields)
    );
    console.log("DB- customer - update customer", customer);
    return customer;
  } catch (error) {
    throw error;
  }
}

export async function getCustomerById(id) {
  try {
    const {
      rows: [customer],
    } = await client.query(
      `
  SELECT *
  FROM customers
  WHERE customers.id =$1;
  `,
      [id]
    );
    return customer;
  } catch (error) {
    throw error;
  }
}

export async function deleteCustomer(customerId) {
  try {
    const {
      rows: [customer],
    } = await client.query(
      `
    DELETE
    FROM customers
    WHERE customers.id=$1;
    `,
      [customerId]
    );
    console.log("db - deleteCueestomer- csutomerID", customerId);
    console.log("db - deleteCueestomer - customer", customer);
    return customer;
  } catch (error) {
    throw error;
  }
}
