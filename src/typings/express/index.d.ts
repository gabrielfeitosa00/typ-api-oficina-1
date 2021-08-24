import { Result } from "express-validator";
declare global {
  namespace Express {
    export interface Request {
      userId: number;
    }
  }
}
