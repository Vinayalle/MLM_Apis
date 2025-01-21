const { authentication, restrictTo } = require("../controller/authController");
const {
  updateWallet,
  // getAllProject,
  // getProjectById,
  // updateProject,
  // deleteProject,
} = require("../controller/walletController");

const router = require("express").Router();

router.route("/").patch(authentication, restrictTo("1"), updateWallet);
// .get(authentication, restrictTo('1'), getAllProject);

module.exports = router;
