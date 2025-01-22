import { NavLink } from "react-router";
import { ShoppingBasket } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);

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
            Farm Market
          </NavLink>
          <NavLink
            className="hover:text-green-500 hover:font-bold relative"
            to={"/cart"}
          >
            <p className="bg-green-700 text-white text-xs rounded-full text-center py-1 font-bold absolute -right-3 -top-2 w-6 h-6">
              {cartItems.length}
            </p>
            <ShoppingBasket />
          </NavLink>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
