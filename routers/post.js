const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const isAuthorizedAdmin = require("../middlewares/isAuthorizedAdmin");

const prisma = new PrismaClient();

//Post blog article in database
router.post("/post_blog_article", isAuthorizedAdmin, async (req, res) => {
  const { title, category, summary, content, file } = req.body;
  console.log(req.body);
  if (!content) {
    return res.status(400).json({ error: "The article has no content." });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        category,
        summary,
        content,
        file,
      },
    });
    return res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//Fetch blog articles from database
router.get("/get_blog_articles", async (req, res) => {
  try {
    const articles = await prisma.post.findMany();
    return res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
