const Router = require("express");
const userCtrl = require("../../../controller/v1/user");
const router = Router();
const validationSchemas = require("../../../validations/index");
const validate = require("../../../middleware/validate");

router.post(
  "/registration",
  validate(validationSchemas.registrationSchema),
  userCtrl.registration
);
router.post("/login", validate(validationSchemas.loginSchema), userCtrl.login);

module.exports = router;
