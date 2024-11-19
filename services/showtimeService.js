const MovieModel = require("../models/movie");
const CinemaModel = require("../models/cinema");
const ShowtimeModel = require("../models/showtime");
const HallModel = require("../models/hall");
const SeatModel = require("../models/seat");

// Tạo suất chiếu mới
exports.createShowtime = async (showtimeData) => {
    return await ShowtimeModel.create(showtimeData);
};

// Lấy tất cả các suất chiếu
exports.getAllShowtimes = async () => {
    return await ShowtimeModel.find().populate('movie_id').populate('hall_id'); // Lấy thêm thông tin về phim và phòng chiếu
};

// Lấy suất chiếu theo ID
exports.getShowtimeById = async (id) => {
    return await ShowtimeModel.findById(id).populate('movie_id').populate('hall_id');
};

// Cập nhật suất chiếu theo ID
exports.updateShowtime = async (id, showtimeData) => {
    return await ShowtimeModel.findByIdAndUpdate(id, showtimeData, { new: true });
};

// Xóa suất chiếu theo ID
exports.deleteShowtime = async (id) => {
    return await ShowtimeModel.findByIdAndDelete(id);
};



exports.getMovieShowtimes = async (idmovies, location, date) => {
    // Check if the movie exists
    const movie = await MovieModel.findById(idmovies);
    if (!movie) throw new Error("Movie not found");

    // Find cinemas in the specified location
    const cinemas = await CinemaModel.find({ city: location });
    if (!cinemas || cinemas.length === 0) throw new Error("No cinemas found in this location");

    // Fetch showtimes for the movie on the selected date
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const showtimes = await ShowtimeModel.find({
        movie_id: idmovies,
        start_time: { $gte: startOfDay, $lte: endOfDay }
    }).populate("hall_id"); // Populate hall data

    // Group showtimes by cinema
    const responseData = await Promise.all(
        cinemas.map(async (cinema) => {
            const cinemaHalls = showtimes.filter((showtime) =>
                showtime.hall_id.cinema_id.equals(cinema._id)
            );

            const hallData = await Promise.all(
                cinemaHalls.map(async (showtime) => {
                    const hall = showtime.hall_id;

                    // Get seats for the hall
                    const seats = await SeatModel.find({ hall_id: hall._id });
                    const availableSeats = seats.filter(
                        (seat) => seat.status === "available"
                    ).length;

                    const isSoldOut = availableSeats === 0;
                    const isAlmostFull = availableSeats <= hall.seats / 3;

                    return {
                        idhalls: hall._id,
                        name: hall.name,
                        showtimes: [
                            {
                                idshowtimes: showtime._id,
                                start_time: showtime.start_time.toISOString(),
                                end_time: showtime.end_time.toISOString(),
                                seatsAvailable: availableSeats,
                                isAlmostFull,
                                isSoldOut,
                            },
                        ],
                    };
                })
            );

            return {
                idcinemas: cinema._id,
                name: cinema.name,
                address: cinema.address,
                hall: hallData,
            };
        })
    );

    return {
        idmovies: movie._id,
        name: movie.title,
        date,
        cinemas: responseData,
    };
};

