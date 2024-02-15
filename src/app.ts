import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import routes from "./app/routes";
import httpStatus from "http-status";
import cookieParser from "cookie-parser";

const app: Application = express();

// Set up CORS options
const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: "GET, POST, PATCH, DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true,
};

// Enable CORS for all routes
app.use(cors(corsOptions));

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie-parser
app.use(cookieParser());

// Application Route
app.use("/api/v1/", routes);

// global error handler
app.use(globalErrorHandler);

// handle not found

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessage: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});
export default app;
