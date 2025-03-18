import { Input, Button } from "antd";
import { useState } from "react";
import validator from "validator";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../utils/helper";
import { Link, useNavigate } from "react-router";

const UserRegister = () => {
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleUserRegister() {
    if (
      validator.isEmpty(userFormData.name, { ignore_whitespace: true }) === true
    ) {
      return alert("Please enter your name");
    }

    if (validator.isEmail(userFormData.email) === false) {
      return alert("Please enter a valid email address");
    }
    if (
      validator.isStrongPassword(userFormData.password, {
        minLength: 6,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
      }) === false
    ) {
      return alert(
        "Password must contain Uppercase, lowercase, number, symbol and minimum of 6 Characters."
      );
    }

    // send user details to server

    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_BASE_URL}/auth/register`,
        userFormData
      );
      if (response.data.status === "success") {
       return navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid p-4 place-items-center h-[80vh] max-w-[500px] mx-auto">
      <form className="flex flex-col gap-4 w-full border p-4 rounded-lg shadow-lg  border-green-800">
        <h1 className="text-2xl text-green-800 text-center">Join F.Mart</h1>
        <p className="text-gray-500 font-light text-center">
          Enjoy exciting deals when you register
        </p>
        <Input
          onChange={(e) =>
            setUserFormData({ ...userFormData, name: e.target.value })
          }
          placeholder="Enter your name"
          size="large"
        />
        <Input
          onChange={(e) =>
            setUserFormData({ ...userFormData, email: e.target.value })
          }
          placeholder="Enter your email"
          size="large"
        />
        <Input.Password
          onChange={(e) =>
            setUserFormData({ ...userFormData, password: e.target.value })
          }
          placeholder="Enter your password"
          size="large"
        />
        <Button
          loading={loading}
          disabled={loading}
          onClick={handleUserRegister}
          block
          type="primary"
          size="large"
        >
          Register
        </Button>

        <p className="text-center text-gray-500 font-light">
           Already have an account?{" "}
          <Link
            className="underline hover:text-green-400 font-medium text-green-800"
            to={"/login"}
          >
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default UserRegister;
