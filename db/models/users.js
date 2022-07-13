import client from "../client.js";
import bcrypt from "bcrypt";
const SALT = 10;

export async function createUser({
  email,
  password,
  firstName,
  lastName,
  department,
  position,
  officeNumber,
}) {
  const hashedPW = bcrypt.hashSync(password, SALT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO 
            users(email, password, "firstName", "lastName", department, position, "officeNumber")
        VALUES
            ($1, $2, $3, $4, $5,$6, $7)
        ON CONFLICT (email) DO NOTHING
        RETURNING 
            id, email, "firstName", "lastName", department, position, "officeNumber"`,
      [email, hashedPW, firstName, lastName, department, position, officeNumber]
    );
    return user;
  } catch (error) {
    console.error("error in createUser db");
    throw error;
  }
}

export async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE email=$1
    `,
      [email]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

export async function getAllUsers() {
  try {
    const { rows } = await client.query(`
    SELECT*    
    FROM users
    ORDER BY "lastName" ASC
    `);
    return rows;
  } catch (error) {
    throw error;
  }
}

export async function updateUser(fields = {}) {
  const setString = Object.keys(fields)
    .map((key, idx) => `"${key}"=$${idx + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    UPDATE users
    SET ${setString}
    WHERE id =${fields.id}
    RETURNING*;
    `,
      Object.values(fields)
    );
    console.log("DB- user - update customer", user);
    return user;
  } catch (error) {
    throw error;
  }
}
