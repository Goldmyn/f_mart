import { Input } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import Payment from "./Payment";

const CheckoutForm = () => {
  const [checkOutFormData, setCheckOutFormData] = useState({
    name: "",
    email: "",
    deliveryAddress: "",
  });

  const { cartItems, userCartSummary } = useSelector((state) => state.cart);
  console.log("My cart items", cartItems);

  if (cartItems.length < 1 || userCartSummary < 0) {
    return <Navigate to={"/marketplace"} />;
  }
  return (
    <>
      <Input
        onChange={(e) =>
          setCheckOutFormData({ ...checkOutFormData, name: e.target.value })
        }
        placeholder="enter your name"
        size="large"
      />
      <Input
        onChange={(e) =>
          setCheckOutFormData({ ...checkOutFormData, email: e.target.value })
        }
        placeholder="enter your email"
        size="large"
      />
      <Input
        onChange={(e) =>
          setCheckOutFormData({
            ...checkOutFormData,
            deliveryAddress: e.target.value,
          })
        }
        placeholder="enter your address"
        size="large"
      />
      <Payment
        checkOutFormData={checkOutFormData}
      />
    </>
  );
};

export default CheckoutForm;
