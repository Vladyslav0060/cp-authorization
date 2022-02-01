const Router = require("express");
const router = new Router();
const controller = require("../controllers/authController");
const { check } = require("express-validator");
const authMiddleware = require("../midlewares/authMiddleware");
const roleMiddleware = require("../midlewares/roleMiddleware");

router.post(
  "/registration",
  [
    check("username", "Name can't be empty!").notEmpty(),
    check("username", "Too short name (at least 4 symbols)").isLength({
      min: 4,
    }),
    check("password", "Password can't be empty").notEmpty(),
    check("password", "Password too short (at least 4 symbols)").isLength({
      min: 4,
    }),
  ],
  controller.registration
);
router.post("/login", controller.login);
router.get("/users", roleMiddleware(["USER"]), controller.getUsers);

module.exports = router;
