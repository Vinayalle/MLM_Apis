const { authentication, restrictTo } = require("../controller/authController");
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

const router = require("express").Router();

router.route("/").post(authentication, restrictTo("2"), createProduct);
router.route("/").get(getAllProducts);
router.route("/:id").get(getProductById);
router
  .route("/:id")
  .patch(authentication, restrictTo("2"), updateProduct)
  .delete(authentication, restrictTo("2"), deleteProduct);

module.exports = router;
