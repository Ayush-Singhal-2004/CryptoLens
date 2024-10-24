import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { chains } from "../constants/constant";
import { StatusCodes } from "http-status-codes";
import {error as errorResponse ,success as successResponse} from "../utils/common"

export const getChains = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        successResponse.data=chains
        res.status(StatusCodes.OK).json(successResponse);
    } catch (error: any) {
        errorResponse.error = error
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
};
