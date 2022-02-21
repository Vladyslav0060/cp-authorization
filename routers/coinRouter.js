const Router = require("express");
const router = new Router();
const controller = require("../controllers/coinConroller");

router.get("/ohlc", controller.getOHLC);
router.get("/symbols", controller.getSymbols);
router.get("/assets", controller.getAssets);
router.get("/assetsExchange", controller.getAssetsForExchange);
router.get("/coin-details", controller.getCoinInfo);

module.exports = router;
