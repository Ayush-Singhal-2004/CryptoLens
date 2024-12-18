import { Request, Response, NextFunction } from "express";
import { chains } from "../constants/constant";
import { StatusCodes } from "http-status-codes";
import {Coins,TrendingTokens} from "../utils/types"
import {error as errorResponse ,success as successResponse,postRequest,getRequest} from "../utils/common"


export const getChains =async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        successResponse.data=chains
        res.status(StatusCodes.OK).json(successResponse);
    } catch (error: any) {
        errorResponse.error = error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

export const getTokens = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const addressHash=req.params.address
        let response= await postRequest("addon/763/rest/addresses/token-balances",addressHash)
        successResponse.data=response
        res.status(StatusCodes.OK).json(successResponse);
    } catch (error: any) {
        errorResponse.error = error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
};

export const getNfts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const addressHash=req.params.address
        let result= await postRequest("addon/763/rest/addresses/nft",addressHash,"","ERC-721,ERC-404,ERC-1155")
        successResponse.data=result
        res.status(StatusCodes.OK).json(successResponse);
    } catch (error: any) {
        errorResponse.error = error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
};

export const getTransactionHistory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const addressHash=req.params.address
        let response= await postRequest("addon/763/rest/addresses/transactions",addressHash,"to | from","")
        successResponse.data=response
        res.status(StatusCodes.OK).json(successResponse);
    } catch (error: any) {
        errorResponse.error = error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
};

export const getTrendingTokens= async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        let response= await getRequest("addon/748/v1/tickers")
        let trendingTokens: Array<TrendingTokens> = []
        response.slice(0, 10).forEach((coin:any)=>{
            trendingTokens.push({
                id: coin.id,
                name: coin.name,
                symbol: coin.symbol,
                rank: coin.rank,
                image: `https://static.coinpaprika.com/coin/${coin.id}/logo.png`,
                price: coin.quotes.USD.price,
                percent_change_15m: coin.quotes.USD.percent_change_15m,
            });
        })
        successResponse.data=trendingTokens
        res.status(StatusCodes.OK).json(successResponse);
    } catch (error: any) {
        errorResponse.error = error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
};


export const getCoins= async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        let response= await getRequest("addon/748/v1/coins")
        let trendingCoins: Array<Coins> = []
        response.slice(0, 10).forEach((coin:any)=>{
            trendingCoins.push({
                id: coin.id,
                name: coin.name,
                symbol:coin.symbol,
                rank: coin.rank,
                image:`https://static.coinpaprika.com/coin/${coin.id}/logo.png`,
                is_new: coin.is_new,
                is_active: coin.is_active,
                type: coin.type
            })
        })
        successResponse.data=trendingCoins
        res.status(StatusCodes.OK).json(successResponse);
    } catch (error: any) {
        errorResponse.error = error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
};


export const getCoinByID=async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const assert_id=req.params.id
        let response= await getRequest(`addon/748/v1/coins/${assert_id}`)
        successResponse.data=response
        res.status(StatusCodes.OK).json(successResponse);
    } catch (error: any) {
        errorResponse.error = error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

export const getTokenByID=async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const assert_id=req.params.id
        let response= await getRequest(`addon/748/v1/tickers/${assert_id}`)
        successResponse.data=response
        res.status(StatusCodes.OK).json(successResponse);
    } catch (error: any) {
        errorResponse.error = error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

export const getExchanges=async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        let response= await getRequest("addon/748/v1/exchanges")
        successResponse.data=response.slice(0,20)
        res.status(StatusCodes.OK).json(successResponse);
    } catch (error: any) {
        errorResponse.error = error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

export const getExchange=async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const assert_id=req.params.id
        let response= await getRequest(`addon/748/v1/exchanges/${assert_id}`)
        successResponse.data=response
        res.status(StatusCodes.OK).json(successResponse);
    } catch (error: any) {
        errorResponse.error = error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}

export const getExchangeMarket=async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const assert_id=req.params.id
        let response= await getRequest(`addon/748/v1/exchanges/${assert_id}/markets`)
        successResponse.data=response
        res.status(StatusCodes.OK).json(successResponse);
    } catch (error: any) {
        errorResponse.error = error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
}