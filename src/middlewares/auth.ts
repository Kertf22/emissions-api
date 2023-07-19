import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const SECRET = 'nelsonsegredo'

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const full = req.headers["authorization"];
  if (!full) {
    res.status(403).end();
    return;
  }
  const token = full.split("Bearer ")[1]


  jwt.verify(token, SECRET, (err: any, data: any) => {
    if (err) {
      res.status(403).end();
      return;
    }

    req.userId = data;
    next();
  });
};


export default authMiddleware;