const user = require("../db/models/user");
const wallet = require("../db/models/wallet");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sequelize = require("../config/database");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = catchAsync(async (req, res, next) => {
  const body = req.body;

  if (!["1", "2"].includes(body.userType)) {
    throw new AppError("Invalid user Type", 400);
  }

  await sequelize.transaction(async (t) => {
    const newUser = await user.create(
      {
        userType: body.userType,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        position: body.position,
        dob: body.dob,
        leftBV: body.leftBV,
        rightBV: body.rightBV,
        nomineName: body.nomineName,
        nomineRelation: body.nomineRelation,
        nominePhone: body.nominePhone,
        sponsorId: body.sponsorId,
        parentId: body.parentId,
        password: body.password,
        confirmPassword: body.confirmPassword,
      },
      { transaction: t }
    );

    if (!newUser) {
      throw new AppError("Failed to create the user", 400);
    }

    const walletBalance = await wallet.create(
      { userId: newUser.id },
      { transaction: t }
    );

    const result = newUser.toJSON();
    const walletIncome = walletBalance.toJSON();

    delete result.password;
    delete result.deletedAt;

    result.token = generateToken({ id: result.id });

    return res.status(201).json({
      status: "success",
      data: { result, walletIncome },
    });
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const result = await user.findOne({ where: { email } });
  if (!result || !(await bcrypt.compare(password, result.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const token = generateToken({
    id: result.id,
  });

  return res.json({
    status: "success",
    result,
    token,
  });
});

const authentication = catchAsync(async (req, res, next) => {
  // 1. get the token from headers
  let idToken = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Bearer asfdasdfhjasdflkkasdf
    idToken = req.headers.authorization.split(" ")[1];
  }
  if (!idToken) {
    return next(new AppError("Please login to get access", 401));
  }
  // 2. token verification
  const tokenDetail = jwt.verify(idToken, process.env.JWT_SECRET_KEY);
  // 3. get the user detail from db and add to req object
  const freshUser = await user.findByPk(tokenDetail.id);

  if (!freshUser) {
    return next(new AppError("User no longer exists", 400));
  }
  req.user = freshUser;
  return next();
});

const restrictTo = (...userType) => {
  const checkPermission = (req, res, next) => {
    if (!userType.includes(req.user.userType)) {
      return next(
        new AppError("You don't have permission to perform this action", 403)
      );
    }
    return next();
  };

  return checkPermission;
};

module.exports = { signup, login, authentication, restrictTo };
