const wallet = require("../db/models/wallet");
const user = require("../db/models/user");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const updateWallet = catchAsync(async (req, res, next) => {
  try {
    const {
      userId,
      matchingIncome,
      directIncome,
      franchiseIncome,
      repurchaseIncome,
      royalityIncome,
    } = req.body;

    // Fetch the wallet for the given user
    const walletIncome = await wallet.findOne({ where: { userId } });

    console.log(walletIncome);
    if (!walletIncome) {
      return res
        .status(404)
        .json({ status: "error", message: "Wallet not found" });
    }

    const totalIn =
      matchingIncome +
      directIncome +
      repurchaseIncome +
      franchiseIncome +
      royalityIncome;
    // Update individual income fields
    console.log(req.body.matchingIncome + req.body.directIncome);
    walletIncome.totalIncome =
      req.body.matchingIncome +
      req.body.directIncome +
      req.body.repurchaseIncome +
      req.body.franchiseIncome +
      req.body.royalityIncome;
    console.log(walletIncome.totalIncome);

    walletIncome.matchingIncome = matchingIncome || 0;
    // wallet.referralIncome += referralIncome || 0;
    walletIncome.directIncome = directIncome || 0;
    walletIncome.franchiseIncome = franchiseIncome || 0;
    walletIncome.royalityIncome = royalityIncome || 0;
    walletIncome.repurchaseIncome = repurchaseIncome || 0;

    // Recalculate the total amount

    await walletIncome.save();

    res.status(200).json({ status: "success", data: walletIncome });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

const getAllProject = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const result = await project.findAll({
    include: user,
    where: { createdBy: userId },
  });

  return res.json({
    status: "success",
    data: result,
  });
});

const getProjectById = catchAsync(async (req, res, next) => {
  const projectId = req.params.id;
  const result = await project.findByPk(projectId, { include: user });
  if (!result) {
    return next(new AppError("Invalid project id", 400));
  }
  return res.json({
    status: "success",
    data: result,
  });
});

const updateProject = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const projectId = req.params.id;
  const body = req.body;

  const result = await project.findOne({
    where: { id: projectId, createdBy: userId },
  });

  if (!result) {
    return next(new AppError("Invalid project id", 400));
  }

  result.title = body.title;
  result.productImage = body.productImage;
  result.price = body.price;
  result.shortDescription = body.shortDescription;
  result.description = body.description;
  result.productUrl = body.productUrl;
  result.category = body.category;
  result.tags = body.tags;

  const updatedResult = await result.save();

  return res.json({
    status: "success",
    data: updatedResult,
  });
});

const deleteProject = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const projectId = req.params.id;
  const body = req.body;

  const result = await project.findOne({
    where: { id: projectId, createdBy: userId },
  });

  if (!result) {
    return next(new AppError("Invalid project id", 400));
  }

  await result.destroy();

  return res.json({
    status: "success",
    message: "Record deleted successfully",
  });
});

module.exports = {
  updateWallet,
  //   getAllProject,
  //   getProjectById,
  //   updateProject,
  //   deleteProject,
};
