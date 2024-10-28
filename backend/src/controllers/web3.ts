import { Request, Response, NextFunction } from "express";
import { chains } from "../constants/constant";
import { StatusCodes } from "http-status-codes";
import {error as errorResponse ,success as successResponse,postRequest} from "../utils/common"

// export interface ExtractedTokenData {
//     exchange_rate: string;
//     holders: string;
//     icon_url: string;
//     name: string;
//     symbol: string;
//   }

export const getTokens = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const addressHash=req.params.address
        let response= await postRequest("addon/763/rest/addresses/token-balances",addressHash)
        // let extreded_data: Array<ExtractedTokenData> = [];
        // response.forEach((item: any) => {
        //     extreded_data.push({
        //         exchange_rate: item.token.exchange_rate,
        //         holders: item.token.holders,
        //         icon_url: item.token.icon_url,
        //         name: item.token.name,
        //         symbol: item.token.symbol,
        //     });
        // });
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