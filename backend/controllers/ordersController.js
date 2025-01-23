import { OrderModel } from "../models/orderModel.js";

const createUserOrder = async (req, res) => {
  const { reference, checkOutFormData, userCartSummary, cartItems } = req.body;

  if (!reference) {
    return res
      .status(400)
      .send({ message: "Please Provide Transaction Reference" });
  }
  if (!checkOutFormData) {
    return res.status(400).send({ message: "Please Provide Customer Details" });
  }

  if (!userCartSummary) {
    return res
      .status(400)
      .send({ message: "Please Provide The Customer Cart Summary" });
  }
  if (!cartItems) {
    return res
      .status(400)
      .send({ message: "Please Provide Customer Cart Items" });
  }

  try {
    const result = await OrderModel.create({
      transaction_reference: {
        transaction: reference.transaction,
        status: reference.status,
        message: reference.message,
        trxref: reference.trxref,
      },
      customer_delivery_info: checkOutFormData,

      user_cart_summary: userCartSummary,
      cartItems: cartItems,
    });
    res.status(201).send({ message: "Order created successfully" });
  } catch (error) {
    return res.status(400).send({ error, message: "An Error Occurred" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();

    res.status(200).json({ message: "successful", data: orders });
  } catch (error) {
    res.status(400).json({ message: "failed", data: error });
  }
};

const getSingleOrderInfo = async (req, res) => {
  const { orderId } = req.params;
  if (!orderId) {
    return res
      .status(400)
      .json({ message: "sorry provide order Id", data: null });
  }

  try {
    const order = await OrderModel.findOne({ _id: orderId });
    res.status(200).json({ message: "Successful", data: order });
  } catch (error) {
    res.status(400).json({ message: "Sorry an error occurred", data: error });
  }
};
export { createUserOrder, getAllOrders, getSingleOrderInfo };
