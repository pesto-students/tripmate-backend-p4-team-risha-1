import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import asyncHandler from "express-async-handler";

declare module "express-serve-static-core" {
  export interface Request {
    user: any;
  }
}
const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token: string;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET ?? "Hello");
        console.log(decoded);
        const userId = decoded.id;
        req.user = await User.findById(userId.toString()).select("-password");
        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error("Not Authorized token failed");
      }
    }
  }
);
export { protect };
