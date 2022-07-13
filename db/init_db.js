import client from "./client.js";
// const { client, User, Customer } = require("./");
import { createCustomer } from "./models/customers.js";
import { createUser } from "./models/users.js";

async function buildTables() {
  try {
    client.connect();
    console.log("Started dropping tables");

    //drop tables in the correct order
    await client.query(`
    DROP TABLE IF EXISTS customers;
    DROP TABLE IF EXISTS users
    `);
    console.log("Finished dropping tables.");
    console.log("Started creating tables.");

    //build tables in correct order
    await client.query(`
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        email varchar(255) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        "firstName" varchar(255),
        "lastName" varchar(255),
        department varchar(255),
        position varchar(255),
        "officeNumber" varchar(255)
    );
    CREATE TABLE customers (
      id SERIAL PRIMARY KEY,
      "companyName" varchar(255) NOT NULL,
      "companyRep" varchar(255) NOT NULL,
      "salesRep" varchar(255),
      description varchar(255) NOT NULL,
      needs varchar(255) NOT NULL,
      "prospectValue" varchar(255)
  );
  `);
    console.log("Finished creating tables");
  } catch (error) {
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log("Starting to create users...");
    const usersToCreate = [
      {
        email: "kevin@kevin.com",
        password: "kevin",
        firstName: "Kevin",
        lastName: "Hongkham",
        department: "Technology",
        position: "Software Engineer",
        officeNumber: "(555) 555-5555",
      },
      {
        email: "amy@amy.com",
        password: "amy",
        firstName: "amy",
        lastName: "amy",
        department: "Business",
        position: "Owner",
        officeNumber: "(555) 555-5556",
      },
      {
        email: "daniel@daniel.com",
        password: "daniel",
        firstName: "daniel",
        lastName: "daniel",
        department: "",
        position: "Manager",
        officeNumber: "(555) 555-5557",
      },
      {
        email: "cung@cung.com",
        password: "cung",
        firstName: "cung",
        lastName: "cung",
        department: "Technology",
        position: "Software Manager",
        officeNumber: "(555) 555-5558",
      },
    ];

    const users = await Promise.all(usersToCreate.map(createUser));
    console.log("Finished Creating Users!");
  } catch (error) {
    throw error;
  }
}

async function createInitialCustomers() {
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper eget duis at tellus at urna condimentum. Nisl vel pretium lectus quam.";
  try {
    console.log("Starting to create customers...");
    const customersToCreate = [
      {
        companyName: "Magik Coats",
        companyRep: "Ashe Lee",
        salesRep: "Gary Gray",
        description: lorem,
        needs: lorem,
        prospectValue: "$1,000,000",
      },
      {
        companyName: "Kooler Boats",
        companyRep: "Brice Cerr",
        salesRep: "Gary Gray",
        description: lorem,
        needs: lorem,
        prospectValue: "$500,000",
      },
      {
        companyName: "sMOOth Barns",
        companyRep: "Betty Loudermilk",
        salesRep: "April June",
        description: lorem,
        needs: lorem,
        prospectValue: "$755,000",
      },
      {
        companyName: "Plant Products",
        companyRep: "Stephen with a ph",
        salesRep: "John Doe",
        description: lorem,
        needs: lorem,
        prospectValue: "$300,000",
      },
    ];
    const customers = await Promise.all(customersToCreate.map(createCustomer));
    console.log("Finished Creating Customers!");
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(createInitialUsers)
  .then(createInitialCustomers)
  .catch(console.error)
  .finally(() => client.end());
