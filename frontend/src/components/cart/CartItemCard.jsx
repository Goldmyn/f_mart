import { Plus, Minus } from "lucide-react";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helper";
import { useDispatch } from "react-redux";
import {
  decreaseCartItemQty,
  deleteCartItem,
  increaseCartItemQty,
} from "../../features/cart/cartSlice";

const CartItemCard = ({
  product_id,
  product_name,
  product_image,
  product_price,
  product_quantity,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between item-center border-green-700 border-b py-3 rounded-md">
      <img className="w-32" src={product_image} alt="" />

      <div>
        <div>
          <h2 className="text-sm lg:text-xl font-semibold text-green-800 mb-4">
            {product_name}
          </h2>
          <p className="text-gray-500 font-light text-lg">
            <span>{formatCurrency(product_price)}</span> <span className="font-bold">x </span>
            <span>{product_quantity}</span>
          </p>
        </div>

        <div className="flex justify-between gap-2 mt-4">
          <div className="flex items-center gap-4 bg-white p-2 rounded-md border">
            <button
              onClick={() => dispatch(decreaseCartItemQty(product_id))}
              className="hover:text-green-700 cursor-pointer"
            >
              <Minus size={16} />
            </button>
            <span className="text-sm lg:text-xl">{product_quantity}</span>
            <button
              onClick={() => dispatch(increaseCartItemQty(product_id))}
              className="hover:text-green-700 cursor-pointer"
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            onClick={() => dispatch(deleteCartItem(product_id))}
            className="underline underline-offset-[10px] text-gray-500 font-medium hover:text-green-700 cursor-pointer text-sm lg:text-xl"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;

CartItemCard.propTypes = {
  product_id: PropTypes.string,
  product_name: PropTypes.string,
  product_image: PropTypes.string,
  product_price: PropTypes.number,
  product_quantity: PropTypes.number,
};
