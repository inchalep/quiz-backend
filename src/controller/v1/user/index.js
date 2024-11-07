const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../../models/user");
const createJWTToken = require("../../../utils/createJWTToken");
const { maskEmail, maskPhoneNumber } = require("../../../utils/maskData");

const registration = async (req, res) => {
  const { name, email, password, dob, phone } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ sucess: false, message: "User already exists" });

    user = new User({
      name,
      email,
      password,
      dob,
      phone,
      topics: []
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const payload = {
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
      },
    };
    const token = await createJWTToken(payload);
    user.token = token;
    await user.save();
    delete user.password;
    user.email = maskEmail(user.email);
    user.phone = maskPhoneNumber(user.phone);
    res
      .status(200)
      .json({ sucess: true, message: "User registered.", data: user });
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let dbUser = await User.findOne({ email });
    if (!dbUser || !(await bcrypt.compare(password, dbUser.password))) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid login credentials" });
    }
    const user = dbUser.toJSON();
    delete user.password;
    const decoded = jwt.decode(user.token);
    if (Date.now() >= decoded.exp * 1000) {
      const payload = {
        user: {
          id: user.id,
          email: user.email,
          phone: user.phone,
          dob: user.dob,
        },
      };
      const token = await createJWTToken(payload);
      dbUser.token = token;
      dbUser.save();
      return res.status(200).send({ success: true, data: { ...user, token } });
    }
    res.status(200).send({ success: true, data: user });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  registration,
  login,
};
