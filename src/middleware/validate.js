const Yup = require("yup");

const validate = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (err) {
      res.status(400).json({ success: false, errors: err.errors });
    }
  };
};

module.exports = validate;
