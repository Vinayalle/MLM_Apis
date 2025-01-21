const product = require("../db/models/product");
const user = require("../db/models/user");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createProduct = catchAsync(async (req, res, next) => {
  const body = req.body;
  // const userId = req.user.id;
  const newProduct = await product.create({
    title: body.title,
    productImage: body.productImage,
    price: body.price,
    bv: body.bv,

    description: body.description,

    createdBy: 2,
  });

  return res.status(201).json({
    status: "success",
    data: newProduct,
  });
});

const getAllProducts = catchAsync(async (req, res, next) => {
  const result = await product.findAll();

  return res.json({
    status: "success",
    data: result,
  });
});

const getProductById = catchAsync(async (req, res, next) => {
  const productId = req.params.id;
  const result = await product.findByPk(productId);
  if (!result) {
    return next(new AppError("Invalid project id", 400));
  }
  return res.json({
    status: "success",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const productId = req.params.id;
  const body = req.body;

  const result = await product.findOne({
    where: { id: productId, createdBy: userId },
  });

  if (!result) {
    return next(new AppError("Invalid project id", 400));
  }

  result.title = body.title;
  result.productImage = body.productImage;
  result.price = body.price;

  result.description = body.description;

  result.bv = body.bv;

  const updatedResult = await result.save();

  return res.json({
    status: "success",
    data: updatedResult,
  });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const productId = req.params.id;
  const body = req.body;

  const result = await product.findOne({
    where: { id: productId, createdBy: userId },
  });

  if (!result) {
    return next(new AppError("Invalid project id", 400));
  }

  await result.destroy();

  return res.json({
    status: "success",
    message: `product with id ${productId} deleted successfully`,
  });
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
