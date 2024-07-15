import { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";
import jwt from "jsonwebtoken";
import config from "../config/config";

export interface AuthRequest extends Request {
  user: string;
}

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.split(" ").at(-1);
    if (!token) {
      return next(createHttpError(401, "User not authorized"));
    }
    // console.log(token);
    const verifyToken = jwt.verify(token, config.jwt_secret_key as string);
    (req as AuthRequest).user = verifyToken.sub as string;
    next();
  } catch (error: any) {
    console.log(error);
    next(createHttpError(500, error?.message));
  }
};
