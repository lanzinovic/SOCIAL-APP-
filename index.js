const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users.js")
const authRoute = require("./routes/auth.js")

dotenv.config();

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on('connected',()=> {
  console.log("Connected to MongoDB");
});

mongoose.connection.on('error', (error) => {
  console.error("Error connecting to MongoDB", error);
});

//middleware
app.use(express.json());
app.use(helmet())
app.use(morgan("common"))

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.listen(8080,()=>{
  console.log("Backend server is running!");
})