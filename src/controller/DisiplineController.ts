/* eslint-disable class-methods-use-this */
import { Request, Response } from "express";

import { Disipline } from "../models";

class DisiplineController {
  public async store(req: Request, res: Response): Promise<Response> {
    try {
      const disipline: Disipline = req.body;
      const newDisipline = Disipline.create(disipline);
      await newDisipline.save();
      return res.status(200).send(newDisipline);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
  public async getByCode(req: Request, res: Response): Promise<Response> {
    try {
      const { code } = req.params;
      const disipline = await Disipline.getByCode(code);
      if (!disipline) {
        return res.status(404).send("Disipline not found");
      }
      return res.status(200).send(disipline);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

export { DisiplineController };
