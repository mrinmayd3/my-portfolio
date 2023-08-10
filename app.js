if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");

const sendMail = require("./helpers/sendMail");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/send", async (req, res) => {
  // console.log(req.body);

  try {
    const messageInfo = await sendMail(req.body);

    console.log(messageInfo);

    res.status(200).json({
      msg: "Message has been sent",
    });
  } catch (error) {
    res.status(400).json({
      error: "your message could not be delivered",
    });
  }
});

app.all("*", (req, res) => {
  res.send("<h3>404 page not found</h3>");
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`app listening at ${port}`));
