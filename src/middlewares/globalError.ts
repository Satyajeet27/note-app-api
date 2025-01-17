import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";

const globalError = async (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    message: err.message,
  });
};

export default globalError;
