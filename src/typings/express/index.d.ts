import { Result } from "express-validator";
declare global {
  namespace Express {
    export interface Request {
      errors: Result;
      userId: number;
    }
  }
}
