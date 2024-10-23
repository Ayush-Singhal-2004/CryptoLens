import { Request, Response, NextFunction } from "express";
import axios from "axios";

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export const testFunction = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { data } = await axios.get<Todo>("https://jsonplaceholder.typicode.com/todos/1");
        res.send(data);  // You don't need to return res.send(), just send the response
    } catch (error) {
        next(error);  // Pass errors to Express's error handler
    }
};
