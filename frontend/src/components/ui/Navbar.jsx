import { NavLink, useNavigate } from "react-router";
import { ShoppingBasket, LogOut, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/user/userSlice";
import { Tooltip } from "antd";

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { loginUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogOut() {
    dispatch(updateUser(null));
    navigate("/login");
  }

  return (
    <nav className="border-b border-green-200 sticky top-0 bg-white">
      <section className="container mx-auto flex p-2 justify-between">
        <NavLink to={"/"}>
          <h2 className="text-2xl font-bold text-green-700 ">F.mart</h2>
        </NavLink>

        <div className="flex gap-4 text-lg font-light items-center text-gray-500">
          <NavLink
            className="hover:text-green-500 hover:font-bold"
            to={"/marketplace"}
          >
            Market
          </NavLink>

          {loginUser === null ? (
            <NavLink
              className="text-green-800 hover:text-black hover:underline"
              to={"/login"}
            >
              Login
            </NavLink>
          ) : (
            <NavLink to={"/profile"}>
              <p className="border text-green-700 border-green-500 font-semibold rounded-full h-7 w-7 flex items-center justify-center uppercase">
                {loginUser.name.slice(0, 1)}
              </p>
            </NavLink>
          )}

          {loginUser !== null && loginUser.userType === "admin" ? (
            <NavLink
              className="border p-1 rounded-md text-green-500 border-green-600"
              to={"/admin"}
            >
              <Tooltip title="Admin dashboard">
                <User size={16} />
              </Tooltip>
            </NavLink>
          ) : (
            <NavLink
              className="hover:text-green-500 hover:font-bold relative"
              to={"/cart"}
            >
              <p className="bg-green-700 text-white text-xs rounded-full text-center py-1 font-semibold absolute -right-3 -top-2 w-6 h-6">
                {cartItems.length}
              </p>
              <ShoppingBasket />
            </NavLink>
          )}

          {loginUser !== null && (
            <button
              onClick={handleLogOut}
              className="border p-1 rounded-md text-red-500 border-red-600"
            >
              <Tooltip title="Logout">
                <LogOut size={16} />
              </Tooltip>
            </button>
          )}
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
