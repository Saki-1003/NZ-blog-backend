const express = require("express");
const app = express();
const authRoute = require("./routers/auth");
const postRoute = require("./routers/post");
const commentsRoute = require("./routers/comment");
const userRoute = require("./routers/user");
const fileUpload = require("express-fileupload");
const cors = require("cors");

require("dotenv").config();

const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/users", userRoute);

app.use(fileUpload());

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
