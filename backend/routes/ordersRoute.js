import express from "express";
const router = express.Router();

import {
  createUserOrder,
  getAllOrders,
  getSingleOrderInfo,
} from "../controllers/ordersController.js";

router.post("/create", createUserOrder);
router.get("/all-order", getAllOrders);
router.get("/order-info/:orderId", getSingleOrderInfo);

export default router;
