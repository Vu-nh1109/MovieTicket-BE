const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

const customerRouter = require("./routes/customerRoute");
app.use("/", customerRouter);

const cinemaRouter = require("./routes/cinemaRoute");
app.use("/", cinemaRouter);

const hallRouter = require("./routes/hallRoute");
app.use("/", hallRouter);

const movieRouter = require("./routes/movieRoute");
app.use("/", movieRouter);

const paymentRouter = require("./routes/paymentRoute");
app.use("/", paymentRouter);

const seatRouter = require("./routes/seatRoute");
app.use("/", seatRouter);

const showtimeRouter = require("./routes/showtimeRoute");
app.use("/", showtimeRouter);

const ticketRouter = require("./routes/ticketRoute");
app.use("/", ticketRouter);

app.listen(3001, () => {
    console.log("System is running on port 3001");
});

module.exports = app;

const mongoose = require("mongoose");
dotenv.config();
const queryString = process.env.MONGODB_URI || "mongodb+srv://hoangviet232003:Unmcmhd2CoFcbFaG@cgv.8j8x8.mongodb.net/?retryWrites=true&w=majority&appName=CGV";

mongoose.connect(queryString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected!'))
    .catch(err => console.log('MongoDB connection error:', err.message));