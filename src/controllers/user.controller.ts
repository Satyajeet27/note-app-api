import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import User from "../model/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return next(createHttpError(400, "All fields are required!"));
    //check if user exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createHttpError(400, "User already exist, please login"));
    }
    //creating new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).send({
      message: "user created successfully",
      user: newUser,
    });
  } catch (error) {
    next(createHttpError(500, "Something went wrong with create user api"));
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(createHttpError(400, "All field are required!"));
    }
    //user check
    const user = await User.findOne({ email });
    if (!user) {
      return next(createHttpError(400, "Invalid email or password"));
    }
    const verifyPassword = bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return next(createHttpError(400, "All field are required!"));
    }
    //creating token
    const token = jwt.sign({ sub: user._id }, config.jwt_secret_key as string, {
      expiresIn: "1d",
    });

    return res.status(200).setHeader("Authorization", `Bearer ${token}`).send({
      message: "Login successful",
      user,
    });
  } catch (error) {
    next(createHttpError(500, "Something went wrong with user login api"));
  }
};
