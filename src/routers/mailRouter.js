const Router = require("express");
const router = new Router();
const controller = require("../../controllers/mailController");

router.post("/text-mail", controller.sendMail);
module.exports = router;
