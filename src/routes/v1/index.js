const Router = require("express");
const userRoutes = require("./userRoute/index");
const quizRoutes = require("./quizRoute/index");

const router = Router();

router.use("/user", userRoutes);
router.use("/quiz", quizRoutes);

module.exports = router;
