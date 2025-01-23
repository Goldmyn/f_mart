import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    transaction_reference: {
      status: String,
      message: String,
      transaction: String,
      trxref: String,
    },
    customer_delivery_info: {
      name: String,
      email: String,
      deliveryAddress: String,
    },
    user_cart_summary: {
      totalCartItemsCost: Number,
      totalCartItemsQty: Number,
    },
    cartItems: Array,
    order_status: {
      type: String,
      enum: {
        values: ["Pending", "Cancelled", "Completed"],
      },
      default: "Pending",
    },
  },
  { timestamps: true }
);

const OrderModel = new mongoose.model("customer_order", orderSchema);

export { OrderModel };
