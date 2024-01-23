const express = require("express");
const cors = require("cors");
require("dotenv").config();

const candidateDescriptionRoutes = require("./routes/candidateDescription");
const candidateListRoutes = require("./routes/candidateList");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
app.use(express.json());

app.use("/candidate_description", candidateDescriptionRoutes);
app.use("/candidate_list", candidateListRoutes);

app.listen(PORT, () => {
  console.log("Server is running...");
});
