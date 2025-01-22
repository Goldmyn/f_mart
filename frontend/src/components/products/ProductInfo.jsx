import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import { PRODUCT_DATA } from "../../constants/data";
import { formatCurrency } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../../features/cart/cartSlice";
import { message } from "antd";
import {
  Home,
  PlusSquare,
  ShoppingBasket,
  ShoppingCartIcon,
} from "lucide-react";

const ProductInfo = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const [messageApi, contextHolder] = message.useMessage();

  function findProduct() {
    const product = PRODUCT_DATA.find(
      (item) => item.product_id === params.productId
    );
    setSingleProduct(product);
  }

  useEffect(() => {
    findProduct();
  }, []);

  if (singleProduct === null) {
    return (
      <div className="grid place-items-center h-screen animate-pulse text-green-600 font-bold">
        <h1>Loading product details...</h1>
      </div>
    );
  }

  function handleAddCartItem() {
    const productAlreadyInCart = cartItems.find((item) => {
      return item.product_id === params.productId;
    });

    if (productAlreadyInCart === undefined) {
      dispatch(addCartItem(singleProduct));
      messageApi.success("Product added to cart successfully");
    } else {
      messageApi.error("Product already added to cart");
    }
  }

  return (
    <section className="max-w-[800px] mx-auto py-16">
      {contextHolder}

      <section className="px-4 py-7 rounded-lg">
        <div>
          <img
            className="rounded-md mb-6 w-[800px] h-[500px] object-cover"
            src={singleProduct.product_image}
            alt={singleProduct.product_name}
          />
        </div>

        <div className="bg-green-50 px-4 py-7 rounded-lg">
          <h1 className="text-3xl font-semibold text-green-800 mb-4">
            {singleProduct.product_name}
          </h1>

          <h3 className="text-xl mb-4 text-green-950 font-bold">
            {formatCurrency(singleProduct.product_price)}
          </h3>

          <p className="text-base mb-4 text-gray-700 md:text-lg font-light">
            {singleProduct.product_description}
          </p>
        </div>

        <div className="flex drop-shadow-md shadow-md shadow-green-500 bg-gray-50 px-1 pb-2 gap-4 fixed bottom-0 left-0 right-0 items-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-green-700 py-2 px-2 text-lg font-semibold text-white mt-4 rounded-md border-2 border-green-700 hover:bg-white hover:text-green-700 transition-colors duration-300 cursor-pointer"
          >
            <Home />
          </button>

          <NavLink
            to={"/cart"}
            className="bg-green-700  relative flex items-center justify-center gap-2 py-2 px-2 text-lg font-semibold text-white mt-4 rounded-md border-2 border-green-700 hover:bg-white hover:text-green-700 transition-colors duration-300 cursor-pointer"
          >
            <span className="bg-green-700 text-white text-xs rounded-full text-center py-1 font-bold absolute -right-3 -top-2 w-6 h-6">
              {cartItems.length}
            </span>
            <ShoppingCartIcon />
          </NavLink>
          <button
            onClick={handleAddCartItem}
            className="bg-green-700 items-center px-4 flex justify-between w-full py-2 text-lg font-semibold text-white mt-4 rounded-md border-2 border-green-700 hover:bg-white hover:text-green-700 transition-colors duration-300 cursor-pointer"
          >
            <ShoppingBasket />
            <span className="mx-auto">Add to cart</span>
            <PlusSquare />
          </button>
        </div>
      </section>
    </section>
  );
};

export default ProductInfo;
