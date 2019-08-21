import { Request, Response, NextFunction } from "express";

function clientSideHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.isBoom) {
    res.status(err.output.payload.statusCode).json(err);
  } else {
    next(err);
  }
}

function serverSideHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
}

module.exports = { clientSideHandler, serverSideHandler };
