const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateIdenticon = require("../utils/generateIdenticon");

const prisma = new PrismaClient();

//new user registration
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const defaultAvatar = generateIdenticon(username);
  const hashedPW = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPW,
      avatar: defaultAvatar,
    },
  });
  return res.json({ user });
});

//login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const mathingUser = await prisma.user.findUnique({ where: { email } });
  if (!mathingUser) {
    return res.status(401).json({ error: "The user is not registered." });
  }

  const isPasswordValid = await bcrypt.compare(password, mathingUser.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "The password is incorrect" });
  }

  if (mathingUser.email === process.env.ADMIN_EMAIL) {
    console.log("admin setting getting called");
    const token = jwt.sign({ id: mathingUser.id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    return res.status(201).json({ isAdmin: true, token });
  }
  console.log("admin setting being skipped");
  const token = jwt.sign({ id: mathingUser.id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return res.json({ token });
});

module.exports = router;
