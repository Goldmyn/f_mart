import express from "express";
const router = express.Router();

import { createUserOrder } from "../controllers/ordersController.js";

router.post("/create", createUserOrder);

export default router;
