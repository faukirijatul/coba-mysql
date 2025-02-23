import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import { syncDB } from "./models/index.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
  res.status(200).json({ message: "API is working correctly." });
});

const API_V1 = "/api/v1";

import categoryRoutes from "./routes/category.route.js";
import productRoutes from "./routes/product.route.js";

app.use(`${API_V1}/categories`, categoryRoutes);
app.use(`${API_V1}/products`, productRoutes);

syncDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
