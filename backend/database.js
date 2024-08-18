import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config()

const pool = mysql
  .createPool({
    host: process.env.MY_SQL_HOST,
    user: process.env.MY_SQL_USER,
    password: process.env.MY_SQL_PASSWORD,
    database: process.env.MY_SQL_DB,
  })
  .promise()

// * get all users
export const getUsers = async () => {
  const [users] = await pool.query(`SELECT * FROM users`)
  return users
}

// * get single user
export const getUser = async (id) => {
  const [user] = await pool.query(
    `
    SELECT * 
    FROM users 
    WHERE id = ?
    `,
    [id]
  )
  return user
}

// * login user
export const loginUser = async (email, password) => {
  try {
    const [user] = await pool.query(
      `
      SELECT *
      FROM users
      WHERE Email = ? 
      AND Password = ?
      `,
      [email, password]
    )

    if (user) {
      return { status: "Success", user }
    } else {
      return { status: "Failed" }
    }
  } catch (err) {
    console.error(err)
    return { status: "Error" }
  }
}

// * signup new user
export const createUser = async (username, email, password) => {
  const newUser = await pool.query(
    `
    INSERT INTO users (Username,Email,Password)
    VALUES (?,?,?)
    `,
    [username, email, password]
  )
  return newUser
}
