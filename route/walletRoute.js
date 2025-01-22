const { authentication, restrictTo } = require("../controller/authController");
const {
  updateWallet,
  updateParentBV,
  // getAllProject,
  // getProjectById,
  // updateProject,
  // deleteProject,
} = require("../controller/walletController");

const router = require("express").Router();

router.route("/").patch(authentication, restrictTo("1"), updateWallet);
router.route("/addbv").post(authentication, restrictTo("1"), updateParentBV);
// .get(authentication, restrictTo('1'), getAllProject);

module.exports = router;
