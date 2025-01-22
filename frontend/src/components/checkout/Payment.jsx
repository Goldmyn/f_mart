import { usePaystackPayment } from "react-paystack";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { clearUserCart } from "../../features/cart/cartSlice";
import { useNavigate } from "react-router";
import { message } from "antd";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../utils/helper";


const PAYSTACK_KEY = import.meta.env.VITE_PAYSTACK_TEST_KEY;

const Payment = ({ checkOutFormData }) => {
  const { userCartSummary, cartItems } = useSelector((state) => state.cart);
  const [messageApi, contextHolder] = message.useMessage();

  const config = {
    reference: new Date().getTime().toString(),
    email: checkOutFormData.email,
    amount: userCartSummary.totalCartItemsCost * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: PAYSTACK_KEY,
  };

  const initializePayment = usePaystackPayment(config);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // you can call this function anything
  const onSuccess = async (reference) => {
    try {
      alert("Payment Successful");
      // Implementation for whatever you want to do with reference and after success call.
      if (reference) {
        // console.log(reference);
        // console.log(checkOutFormData);
        // console.log(userCartSummary);
        // console.log(cartItems);

        // send data to backend server route
        const response = await axios.post(
          `${BACKEND_BASE_URL}/order/create`,
          {
            reference,
            checkOutFormData,
            userCartSummary,
            cartItems,
          }
        );

        console.log(response);

        // clear cart on successful payment
        dispatch(clearUserCart());
        localStorage.removeItem("cartSummary");
        localStorage.removeItem("userCart");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
    alert("An error occurred");
  };

  function handlePayment() {
    if (checkOutFormData.name.trim() === "") {
      return messageApi.error("Sorry Provide our name");
    }
    if (checkOutFormData.email.trim() === "") {
      return messageApi.error("Sorry Provide our email");
    }
    if (checkOutFormData.deliveryAddress.trim() === "") {
      return messageApi.error("Sorry Provide our Delivery Address");
    }
    initializePayment({ onSuccess, onClose });
  }

  return (
    <div>
      {contextHolder}
      <button
        className="bg-green-700 w-full py-2 text-lg font-semibold text-white mt-4 rounded-md border-2 border-green-700 hover:bg-white hover:text-green-700 transition-colors duration-300 cursor-pointer"
        onClick={handlePayment}
      >
        Pay now!!
      </button>
    </div>
  );
};

Payment.propTypes = {
  userEmail: PropTypes.string,
  amount: PropTypes.number,
  checkOutFormData: PropTypes.object,
};

export default Payment;
