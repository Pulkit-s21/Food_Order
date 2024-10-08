import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { getUser, getUsers, createUser, loginUser } from "./database.js"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

app.use(
  cors({
    origin: "*",
  })
)

app.use(express.json())

// ? get all users
app.get("/users", async (req, res) => {
  const users = await getUsers()
  res.status(201).send(users)
})

// ? get single users
app.get("/users/:id", async (req, res) => {
  const id = req.params.id
  const user = await getUser(id)
  res.status(201).send(user)
})

// ? login user
app.post("/login", async (req, res) => {
  const { email, password } = req.body
  const allowedUser = await loginUser(email, password)
  res.status(201).send(allowedUser)
})

// ? create new User
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body
  const signup = createUser(username, email, password)
  res.status(201).send(signup)
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
