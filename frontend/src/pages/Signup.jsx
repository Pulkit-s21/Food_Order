import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export const Signup = () => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState([])

  const handleInput = (e) => {
    e.preventDefault()
    setFormValues((prev) => ({ ...prev, [e.target.name]: [e.target.value] }))
  }

  const validations = (values) => {
    let errors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

    if (values.username === "") {
      errors.username = "Name should not be empty"
    } else {
      errors.username = ""
    }

    if (values.email === "") {
      errors.email = "Please enter an email address"
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Email didnt meet accepted pattern"
    } else {
      errors.email = ""
    }

    if (values.password === "") {
      errors.password = "Please enter a password"
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        "Password needs to be min 8 characters, one uppercase, one lowercase, one number, one special character"
    } else {
      errors.password = ""
    }

    // if (values.confirmPassword[0] === "") {
    //   errors.confirmPassword = "Please re-enter a password"
    // } else if (values.confirmPassword[0] !== values.password[0]) {
    //   errors.confirmPassword = "Passwords did not match"
    // } else {
    //   errors.confirmPassword = ""
    // }
    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors(validations(formValues))
    if (
      errors.username === "" &&
      errors.email === "" &&
      errors.password === ""
    ) {
      axios
        .post("http://localhost:8080/signup", formValues)
        .then(() => {
          navigate("/")
        })
        .catch((err) => console.error(err))
    }
  }

  return (
    <div className="flex flex-col gap-10 max-w-sm mx-auto">
      <h2 className="text-3xl font-semibold">Sign up for an account</h2>
      <form
        action=""
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6"
      >
        <div className="flex flex-col text-start">
          <label className="font-semibold" htmlFor="email">
            Username
          </label>
          <input
            className="border-2 border-neutral-200 rounded-lg px-2 py-1 focus:border-transparent focus:outline outline-1 outline-blue-500"
            type="text"
            name="username"
            onChange={handleInput}
            placeholder="Enter your username..."
          />
          {errors.username && (
            <span className="text-red-500">{errors.username}</span>
          )}
        </div>
        <div className="flex flex-col text-start">
          <label className="font-semibold" htmlFor="email">
            Email
          </label>
          <input
            className="border-2 border-neutral-200 rounded-lg px-2 py-1 focus:border-transparent focus:outline outline-1 outline-blue-500"
            type="email"
            name="email"
            onChange={handleInput}
            placeholder="Enter your email address..."
          />
          {errors.email && <span className="text-red-500">{errors.email}</span>}
        </div>
        <div className="flex flex-col text-start">
          <label className="font-semibold" htmlFor="password">
            Password
          </label>
          <input
            className="border-2 border-neutral-200 rounded-lg px-2 py-1 focus:border-transparent focus:outline outline-1 outline-blue-500"
            type="password"
            name="password"
            onChange={handleInput}
            placeholder="Enter your password..."
          />
          {errors.password && (
            <span className="text-red-500">{errors.password}</span>
          )}
        </div>
        {/* <div className="flex flex-col text-start">
          <label className="font-semibold" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="border-2 border-neutral-200 rounded-lg px-2 py-1 focus:border-transparent focus:outline outline-1 outline-blue-500"
            type="password"
            name="confirmPassword"
            onChange={handleInput}
            placeholder="Confirm your password..."
          />
          {errors.confirmPassword && (
            <span className="text-red-500">{errors.confirmPassword}</span>
          )}
        </div> */}
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg hover:text-blue-500 hover:bg-white hover:border-blue-500 transition-all border-2 border-transparent font-bold text-lg"
        >
          Sign up
        </button>
        <p>
          <span className="text-neutral-400">Already have an account ?</span>{" "}
          <Link to={"/"} className="hover:text-blue-700 transition-all">
            Login
          </Link>
        </p>
      </form>
    </div>
  )
}
