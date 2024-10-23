import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { chains } from "../constants/constant";


export const getChains = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        res.send(chains);  // You don't need to return res.send(), just send the response
    } catch (error) {
        next(error);  // Pass errors to Express's error handler
    }
};
