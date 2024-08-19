import mysql from "mysql2"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
dotenv.config()

const saltRounds = 10 // saltRounds is the num of calculations required for hashing the password

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
      `,
      [email]
    )

    if (user) {
      const isMatch = bcrypt.compare(password, user[0].Password)
      if (isMatch) {
        return { status: "Success", user }
      } else {
        return "Password didn't match"
      }
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
  bcrypt.hash(password[0], saltRounds, async (err, hashedPassword) => {
    if (err) {
      res.status(404).send("Couldn't hash the password")
    } else {
      const newUser = await pool.query(
        `
        INSERT INTO users (Username,Email,Password)
        VALUES (?,?,?)
        `,
        [username, email, hashedPassword]
      )
    }
  })
}
