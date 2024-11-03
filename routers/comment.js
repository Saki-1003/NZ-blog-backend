const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const isAuthenticated = require("../middlewares/isAuthenticated");

const prisma = new PrismaClient();

//Post comment in database
router.post("/comment", isAuthenticated, async (req, res) => {
  const { textField } = req.body;

  if (!textField) {
    return res.status(400).json({ error: "The post has no content." });
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        textField,
        authorId: req.userId,
      },
      include: {
        author: true,
      },
    });
    return res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//Fetch latest 20 comments from database
router.get("/get_latest_comments", async (req, res) => {
  try {
    const latestComments = await prisma.comment.findMany({
      take: 20,
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
      },
    });
    return res.json(latestComments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
