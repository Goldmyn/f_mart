import { Input, Button } from "antd";
import { useState } from "react";
import validator from "validator";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../utils/helper";
import { Link, useNavigate } from "react-router";
import { updateUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";

const UserLogin = () => {
  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function handleUserLogin() {
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
        "Password must contain Uppercase, lowercase, number, symbol and minimum of 6 Characters"
      );
    }

    // send user details to server

    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_BASE_URL}/auth/login`,
        userFormData
      );

      if (response.data.status === "success") {
        // update user in store from null to the response from database
        dispatch(updateUser(response.data.data));
        // redirect the user based on the userType property
        return response.data.data.userType === "admin"
          ? navigate("/admin")
          : navigate("/profile");
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
        <h1 className="text-2xl text-green-800 text-center">Welcome</h1>
        <p className="text-gray-500 font-light text-center">
          Enter your login credentials to continue
        </p>
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
          onClick={handleUserLogin}
          block
          type="primary"
          size="large"
        >
          Login
        </Button>

        <p className="text-center text-gray-500 font-light">
          Don&apos;t have an account yet?{" "}
          <Link
            className="underline hover:text-green-400 font-medium text-green-800"
            to={"/register"}
          >
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default UserLogin;
