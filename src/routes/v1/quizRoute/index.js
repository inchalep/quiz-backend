const Router = require("express");
const quizCtrl = require("../../../controller/v1/quiz");
const auth = require("../../../middleware/auth");
const validate = require('../../../middleware/validate');
const router = Router();
const validationSchemas = require("../../../validations/index");

//topics
router.post("/add-topic", auth, validate(validationSchemas.addTopicSchema), quizCtrl.addTopics);
router.post("/delete-topic", auth, validate(validationSchemas.topicIdSchema), quizCtrl.deleteTopic);
router.get("/topiclist", auth, quizCtrl.fetchTopicList);

//questions
router.post("/add-question", auth, validate(validationSchemas.addQuestionSchema), quizCtrl.addQuestion);
router.post("/delete-question", auth, validate(validationSchemas.topicIdSchema), quizCtrl.deleteQuestion);
router.post("/edit-question", auth, validate(validationSchemas.addQuestionSchema), quizCtrl.editQuestion);
router.post("/fetch-questions", auth, validate(validationSchemas.fetchQuestionSchema), quizCtrl.fetchQuestion);
router.post("/update-score", auth, validate(validationSchemas.updateScoreSchema), quizCtrl.updateScore);

//results
router.get("/top-players", auth, quizCtrl.getTopPlayers);
router.get("/get-my-score", auth, quizCtrl.getMyScore);

module.exports = router;
