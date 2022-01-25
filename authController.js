const User = require("./models/User");
const Role = require("./models/Role");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("./config");

const generateToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "48h" });
};

class authController {
  async registration(req, res) {
    console.log(req.body);
    try {
      const errorsValidator = validationResult(req);
      if (!errorsValidator.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Something went wrong...\n", errorsValidator });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate)
        return res
          .status(400)
          .json({ message: `User with name ${username} exists` });
      // return res.status(400).send("User exists");
      const hashPassword = bcrypt.hashSync(password, 5);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });
      await user.save();
      return res.status(200).json({ message: "Registration succeed!" });
      res.json("server works: okay");
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration failed" });
    }
  }
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: `User ${username} not found` });
      }
      const validPassword = bcrypt.compareSync(password, user.password); //вызывыем compareSync и передаем пароль без хеша, затем хешированый пароль с базы
      if (!validPassword)
        return res.status(400).json({ message: "Incorrect password" });
      const token = generateToken(user._id, user.roles);
      return res.json({ token });
      // res.json("server works: okay")
      // console.log("fine")
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login failed" });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Failed to get users" });
    }
  }
}

module.exports = new authController();
