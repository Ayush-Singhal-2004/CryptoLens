import express from "express";
import { getTokens, getNfts,getTransactionHistory } from "../controllers/web3";
const router = express.Router();

router.get("/tokens/:address", getTokens);
router.get("/nfts/:address", getNfts);
router.get("/transactions/:address",getTransactionHistory);

export default router; 