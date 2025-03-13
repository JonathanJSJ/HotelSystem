import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { combinedSwagger } from "../swaggerDoc/SwaggerHelper.js";
import {connectDB} from "./config/db.js";
import router from "./routes/routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

connectDB()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(combinedSwagger));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

app.use("/api", router); 

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
