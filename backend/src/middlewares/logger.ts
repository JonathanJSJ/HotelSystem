import { NextFunction, Request, Response } from "express";

export const logger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const start = Date.now();
  console.log(
    `${req.method} ${req.originalUrl} - Started at ${new Date(
      start
    ).toISOString()}`
  );

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `${req.method} ${req.originalUrl} - Completed in ${duration}ms`
    );
  });

  next();
};
