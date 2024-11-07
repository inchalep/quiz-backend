const express = require("express");
const connectDB = require("./config/db");
const app = express();
const routes = require("./routes/index");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

require("dotenv").config();
app.use(
  cors({
    origin: "*",
  })
);

connectDB();
app.use(express.json({ extended: false }));
app.get("/example", (req, res) => {
  res.json({ message: "This is a CORS-enabled response." });
});
app.use("/api", routes);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

