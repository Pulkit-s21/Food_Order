import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import Swal from "sweetalert2"
import axios from "axios"

export const Login = () => {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
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
    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors(validations(formValues))
    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8080/login", formValues)
        .then((res) => {
          if (res.data.status === "Success") {
            let timerInterval
            Swal.fire({
              html: `
              <div class="flex flex-col gap-6">
                <p class="text-4xl">Welcome <span class="font-bold text-blue-500">${res.data.user[0].Username}</span></p>
                  <p class="text-lg text-neutral-900">Happy <span class="font-bold">Food-ing</span> 🌮 🥗 ☕ </p>
              </div>
              `,
              timer: 1500,
              didOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {}, 500)
              },
              willClose: () => {
                clearInterval(timerInterval)
              },
            }).then((result) => {
              if (result.dismiss === Swal.DismissReason.timer) {
                navigate("/")
              }
            })
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: res.data.message || "No record found of this user",
            })
          }
        })
        .catch((err) => console.error(err))
    }
  }

  return (
    <div className="flex flex-col gap-10 max-w-sm mx-auto">
      <h2 className="text-3xl font-semibold">Sign in to your account</h2>
      <form
        action=""
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6"
      >
        <div className="flex flex-col text-start">
          <label className="font-semibold" htmlFor="email">
            Email
          </label>
          <input
            className="border-2 border-neutral-200 rounded-lg px-2 py-1 focus:border-transparent focus:outline outline-1 outline-blue-500"
            type="email"
            name="email"
            value={formValues.email}
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
            value={formValues.password}
            onChange={handleInput}
            placeholder="Enter your password..."
          />
          {errors.password && (
            <span className="text-red-500">{errors.password}</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg hover:text-blue-500 hover:bg-white hover:border-blue-500 transition-all border-2 border-transparent font-bold text-lg"
        >
          Login
        </button>
        <p>
          <span className="text-neutral-400">Not a member ?</span>{" "}
          <Link to={"/signup"} className="hover:text-blue-700 transition-all">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  )
}
