import { useSelector } from "react-redux";
import CartItemCard from "./CartItemCard";
import { Link } from "react-router";

const CartList = () => {
  const { cartItems } = useSelector((state) => state.cart);

  if (cartItems.length === 0) {
    return (
      <div className="my-16 text-center">
        <h3 className="text-3xl text-black mb-6">Your Cart Is Empty</h3>
        <Link
          className="underline underline-offset-[10px] text-xl hover:text-green-800"
          to={"/marketplace"}
        >
          Shop now
        </Link>
      </div>
    );
  }
  return (
    <div className="bg-green-50 p-2">
      {cartItems.map((item) => {
        return (
          <CartItemCard
            key={item.product_id}
            product_id={item.product_id}
            product_image={item.product_image}
            product_name={item.product_name}
            product_price={item.product_price}
            product_quantity={item.product_quantity}
          />
        );
      })}
    </div>
  );
};

export default CartList;
