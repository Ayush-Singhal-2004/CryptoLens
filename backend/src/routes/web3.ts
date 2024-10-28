import express from "express";
import { getChains,getTokens, getNfts,getTransactionHistory } from "../controllers/web3";
const router = express.Router();

// Home Page Api's
router.get('/chains',getChains)

// Profile Api's
router.get("/tokens/:address", getTokens);
router.get("/nfts/:address", getNfts);
router.get("/transactions/:address",getTransactionHistory);

export default router; 