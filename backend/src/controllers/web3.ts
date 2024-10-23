import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { chains } from "../constants/constant";
import { StatusCodes } from "http-status-codes";
import {ErrorResponse,SuccessResponse} from "../utils/common"

export const getChains = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        SuccessResponse.data=chains
        res.status(200).json(SuccessResponse);
    } catch (error: any) {
        ErrorResponse.error = error
        res.status(500).json(ErrorResponse);
    }
};
