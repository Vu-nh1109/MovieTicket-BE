const MovieModel = require("../models/movie");
const CinemaModel = require("../models/cinema");
const ShowtimeModel = require("../models/showtime");
const HallModel = require("../models/hall");
const SeatModel = require("../models/seat");
const moment = require('moment-timezone');

// Tạo suất chiếu mới
exports.createShowtime = async (showtimeData) => {
    return await ShowtimeModel.create(showtimeData);
};

// Lấy tất cả các suất chiếu
exports.getAllShowtimes = async () => {
    const showtimes = await ShowtimeModel.find().populate('movie_id hall_id');    
    return showtimes; 
};


// Lấy suất chiếu theo ID
exports.getShowtimeById = async (id) => {
    return await ShowtimeModel.findById(id).populate('movie_id hall_id');
};

// Cập nhật suất chiếu theo ID
exports.updateShowtime = async (id, showtimeData) => {
    return await ShowtimeModel.findByIdAndUpdate(id, showtimeData, { new: true });
};

// Xóa suất chiếu theo ID
exports.deleteShowtime = async (id) => {
    return await ShowtimeModel.findByIdAndDelete(id);
};

// Fetching showtimes by movie, location, and date
exports.getMovieShowtimes = async (idmovies, location, date) => {
    // Set the time zone to GMT+7 (Asia/Ho_Chi_Minh for Vietnam)
    const vietnamTimezone = 'Asia/Ho_Chi_Minh';

    // Convert input date to the specified timezone (Vietnam time)
    const startOfDay = moment.tz(date, vietnamTimezone).startOf('day').toDate();
    const endOfDay = moment.tz(date, vietnamTimezone).endOf('day').toDate();

    const movie = await MovieModel.findById(idmovies);
    if (!movie) throw new Error("Movie not found");

    const cinemas = await CinemaModel.find({ city: location });
    if (!cinemas.length) throw new Error("No cinemas found in this location");

    const cinemaIds = cinemas.map((cinema) => cinema._id);

    // Find the showtimes within the specified date range for the movie
    const showtimes = await ShowtimeModel.find({
        movie_id: idmovies,
        start_time: { $gte: startOfDay, $lte: endOfDay },
        hall_id: { $in: await HallModel.find({ cinema_id: { $in: cinemaIds } }).distinct("_id") }
    }).populate("hall_id");

    // Process the cinemas and showtimes
    const data = await Promise.all(
        cinemas.map(async (cinema) => {
            const halls = await Promise.all(
                showtimes
                    .filter((showtime) => {
                        const hall = showtime.hall_id;
                        return hall && hall.cinema_id.toString() === cinema._id.toString();
                    })
                    .map(async (showtime) => {
                        const totalSeats = showtime.hall_id.seats; // Directly from the populated Hall model
                        const bookedSeats = await SeatModel.countDocuments({ showtime_id: showtime._id });
                        const seatsAvailable = totalSeats - bookedSeats;

                        return {
                            idhall: showtime.hall_id._id,
                            name: showtime.hall_id.name,
                            showtimes: [
                                {
                                    idshowtime: showtime._id,
                                    start_time: showtime.start_time,
                                    end_time: showtime.end_time,
                                    seatsAvailable,
                                    isAlmostFull: seatsAvailable <= totalSeats / 3,
                                    isSoldOut: seatsAvailable === 0,
                                }
                            ]
                        };
                    })
            );

            return halls.length
                ? { idcinema: cinema._id, name: cinema.name, address: cinema.address, halls: halls }
                : null;
        })
    );

    return {
        idmovie: idmovies,
        title: movie.title,
        date,
        cinemas: data.filter((cinema) => cinema !== null),
    };
};

// Get booked seats for a specific showtime
exports.getSeatStatus = async (idshowtimes) => {
    // Fetch booked seats for the given showtime
    const seats = await SeatModel.find({ 
        showtime_id: idshowtimes, 
        status: "booked" 
    });

    // Extract seat numbers
    const bookedSeats = seats.map(seat => seat.seat_number);

    return { idshowtimes, bookedSeats };
};
