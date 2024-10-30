import express from "express";
import { getChains,getTokens, getNfts,getTransactionHistory,getCoins,getCoinByID,getTrendingTokens } from "../controllers/web3";
const router = express.Router();

// Home Page Api's
router.get('/chains',getChains)
router.get("/coins",getCoins)
router.get('/trendingtokens',getTrendingTokens)
router.get("/coin/:id",getCoinByID)
// Profile Api's
router.get("/tokens/:address", getTokens);
router.get("/nfts/:address", getNfts);
router.get("/transactions/:address",getTransactionHistory);

export default router; 