import express from "express";
import { getChains } from "../controllers/web3";
const router = express.Router();

router.get("/chains", getChains);

export default router;  // Corrected export statement