require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");

const authRouter = require("./route/authRoute");
const projectRouter = require("./route/projectRoute");
const userRouter = require("./route/userRoute");
const productRouter = require("./route/productRoute");
const walletRouter = require("./route/walletRoute");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

// all routes will be here
app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/user/wallet", walletRouter);

app.use(
  "*",
  catchAsync(async (req, res, next) => {
    throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
  })
);

app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 4000;

app.listen(PORT, () => {
  console.log("Server up and running", PORT);
});
