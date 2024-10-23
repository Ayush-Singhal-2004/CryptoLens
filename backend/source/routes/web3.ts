import express from "express";
import { testFunction } from "../controllers/web3";
const router = express.Router();

router.get("/web3", testFunction);

export default router;  // Corrected export statement