const TopicSchema = require("../../../models/topics");
const Question = require("../../../models/question");
const User = require("../../../models/user");

//topics

const addTopics = async (req, res) => {
  const { name } = req.body;
  try {
    const payload = new TopicSchema({
      name,
    });
    payload.save();
    res.status(200).json({ sucess: true, message: "Topic added." });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const fetchTopicList = async (req, res) => {
  try {
    const topics = await TopicSchema.find();
    res.status(200).json({
      sucess: true,
      message: "Topic fetched successfully.",
      data: topics,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deleteTopic = async (req, res) => {
  try {
    const { id } = req.body;
    await TopicSchema.deleteOne({ _id: id });
    res.status(200).json({
      sucess: true,
      message: "Topic deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
//questions

const addQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer, topic } = req.body;
    const questionSchema = new Question({
      question,
      options,
      correctAnswer,
      topic,
    });
    await questionSchema.save();
    res.status(200).json({
      sucess: true,
      message: "Question added successfully.",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.body;
    await Question.deleteOne({ _id: id });
    res.status(200).json({
      sucess: true,
      message: "Question deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const editQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer, topic, id } = req.body;
    const payload = {
      question,
      options,
      correctAnswer,
      topic,
    };
    await Question.updateOne({ _id: id }, { $set: payload });
    res.status(200).json({
      sucess: true,
      message: "Question updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const fetchQuestion = async (req, res) => {
  try {
    const { topics } = req.body;
    const questions = await Question.find({
      topic: { $in: [...topics] },
    });
    const randomQuestions = questions
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    res.status(200).json({
      sucess: true,
      message: "Question fetched successfully.",
      data: randomQuestions,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateScore = async (req, res) => {
  try {
    const { score, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: "User not found" });
    await User.updateOne(
      { _id: userId },
      {
        $set: {
          score: Number(score),
        },
      }
    );
    res.status(200).json({ sucess: true, message: "Score saved." });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getTopPlayers = async (req, res) => {
  try {
    const result = await User.find({}, { name: 1, score: 1 })
      .sort({ score: -1 })
      .limit(10);
    res
      .status(200)
      .json({ sucess: true, message: "Score saved.", data: result });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
const getMyScore = async (req, res) => {
  try {
    const user = req.user;
    const result = await User.findOne({ email: user.email }, { name: 1, score: 1 })
      .sort({ score: -1 })
      .limit(10);
    res
      .status(200)
      .json({ sucess: true, message: "Score saved.", data: result });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  addTopics,
  fetchTopicList,
  deleteTopic,
  addQuestion,
  deleteQuestion,
  editQuestion,
  fetchQuestion,
  updateScore,
  getTopPlayers,
  getMyScore,
};
