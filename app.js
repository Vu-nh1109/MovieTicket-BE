const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());

const customerRouter = require("./routes/customerRoute");
app.use("/customers/", customerRouter);

const cinemaRouter = require("./routes/cinemaRoute");
app.use("/cinemas/", cinemaRouter);

const hallRouter = require("./routes/hallRoute");
app.use("/halls/", hallRouter);

const movieRouter = require("./routes/movieRoute");
app.use("/movies/", movieRouter);

const paymentRouter = require("./routes/paymentRoute");
app.use("/payments/", paymentRouter);

const seatRouter = require("./routes/seatRoute");
app.use("/seats/", seatRouter);

const showtimeRouter = require("./routes/showtimeRoute");
app.use("/showtimes/", showtimeRouter);

const ticketRouter = require("./routes/ticketRoute");
app.use("/tickets/", ticketRouter);

const generalRouter = require("./routes/generalRoute");
app.use("/", generalRouter);

module.exports = app;

const mongoose = require("mongoose");
dotenv.config();
const queryString = process.env.MONGODB_URI || "mongodb+srv://hoangviet232003:Unmcmhd2CoFcbFaG@cgv.8j8x8.mongodb.net/?retryWrites=true&w=majority&appName=CGV";

mongoose.connect(queryString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected!'))
    .catch(err => console.log('MongoDB connection error:', err.message));
