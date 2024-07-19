import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import User from "../model/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { AuthRequest } from "../middlewares/authenticate";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return next(createHttpError(400, "All fields are required!"));
    if (password.length < 6)
      return next(
        createHttpError(400, "Password length should be minimum 6 characters")
      );

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
    // console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return next(createHttpError(400, "All field are required!"));
    }
    //user check
    const user = await User.findOne({ email });
    if (!user) {
      return next(createHttpError(400, "Invalid email or password"));
    }
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return next(createHttpError(400, "All field are required!"));
    }
    //creating token
    const token = jwt.sign({ sub: user._id }, config.jwt_secret_key as string, {
      expiresIn: "1d",
    });

    return res.status(200).send({
      message: "Login successful",
      token,
      user: { userName: user.username, email: user.email },
    });
  } catch (error) {
    next(createHttpError(500, "Something went wrong with user login api"));
  }
};

export const getuserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as AuthRequest).user;
  try {
    const user = await User.findById({ _id: userId });
    return res.status(200).send({
      user: {
        userId: user?._id,
        username: user?.username,
        email: user?.email,
        // createdAt: user?.createdAt,
      },
    });
  } catch (error) {
    next(createHttpError(500, "Some went wrong while fetching user"));
  }
};

export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = (req as AuthRequest).user;
  const { username, newPassword, oldPassword } = req.body;
  console.log(oldPassword);
  try {
    const user = await User.findById({ _id: userId });
    if (oldPassword && newPassword) {
      const comparePassword = await bcrypt.compare(
        oldPassword,
        user?.password as string
      );
      console.log("compare", comparePassword);
      if (!comparePassword) {
        return next(createHttpError(400, "Incorrect Password"));
      }
    }
    await User.updateOne(
      { _id: userId },
      {
        $set: {
          username,
          password: newPassword,
        },
      },
      { new: true }
    );
    return res.status(200).send({
      message: "Successfully updated",
    });
  } catch (error) {
    next(
      createHttpError(500, "Something went wrong with update user profile api")
    );
  }
};
