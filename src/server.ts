import express from "express";

import cors from "cors";



import { IncomingMessage, ServerResponse } from "http";

class App {
  private app: express.Application;

  private port: number;



  constructor(middlewares: (((req: cors.CorsRequest, res: { statusCode?: number | undefined; setHeader(key: string, value: string): any; end(): any; }, next: (err?: any) => any) => void) | ((req: IncomingMessage, res: ServerResponse, next: (err?: unknown) => void) => void))[], port: number) {
    this.app = express();
    this.app.use(cors());
    this.port = port;


    this.initGlobalMiddlewares(middlewares);

  }



  private initGlobalMiddlewares(middlewares: any[]) {
    middlewares.forEach((middleware: any) => {
      this.app.use(middleware);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`started at port ${this.port}`);
    });
  }
}

export default App;
