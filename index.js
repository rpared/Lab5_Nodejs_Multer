const express = require("express");
//if there is a port in my environment file (.env) use it (there is).
require("dotenv").config();
const app = express();
PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//to store files that dont change and can be public, like images html, pdf
app.use(express.static("public"));

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send("Hello World! This is running on an environment captured Port");
});

app
  .route("/register")
  .get((req, res) => {
    // There must be a views folder with a registerUser.html in it
    res.sendFile(__dirname + "/views" + "/registerUser.html");
  })
  .post(upload.single("photo"), (req, res) => {
    const user = req.body;
    console.log(user);
    console.log(req.file); // Information about the uploaded photo ID
    res.send("User registered successfully");
  });

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
