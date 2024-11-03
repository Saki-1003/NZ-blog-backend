const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const isAuthenticated = require("../middlewares/isAuthenticated");

const prisma = new PrismaClient();

router.get("/find_user", isAuthenticated, async (req, res) => {
  try {
    const matchingUser = await prisma.user.findUnique({
      where: { id: req.userId },
    });
    if (!matchingUser) {
      res.status(404).json({ error: "The user cannot be found." });
    }
    return res.status(200).json({
      user: {
        id: matchingUser.id,
        email: matchingUser.email,
        username: matchingUser.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "No authorization issued." });
  }
});

module.exports = router;
