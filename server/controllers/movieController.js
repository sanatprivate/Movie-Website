const asyncHandler = require('express-async-handler');
const Movie = require('../models/Movie');

const getMovies = asyncHandler(async (req, res) => {
    const movies = await Movie.find({}).populate('user', 'username');
    res.json(movies);
});

const getMovieById = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (movie) {
        res.json(movie);
    } else {
        res.status(404);
        throw new Error('Movie not found');
    }
});

const createMovie = asyncHandler(async (req, res) => {
    const { title, description, genre, releaseDate, trailerUrl, posterUrl } = req.body;

    const movie = new Movie({
        title,
        description,
        genre,
        releaseDate,
        trailerUrl,
        posterUrl,
        user: req.user._id,
    });

    const createdMovie = await movie.save();
    res.status(201).json(createdMovie);
});

const updateMovie = asyncHandler(async (req, res) => {
    const { title, description, genre, releaseDate, trailerUrl, posterUrl } = req.body;

    const movie = await Movie.findById(req.params.id);

    if (movie) {
        movie.title = title;
        movie.description = description;
        movie.genre = genre;
        movie.releaseDate = releaseDate;
        movie.trailerUrl = trailerUrl;
        movie.posterUrl = posterUrl;

        const updatedMovie = await movie.save();
        res.json(updatedMovie);
    } else {
        res.status(404);
        throw new Error('Movie not found');
    }
});

const deleteMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.findById(req.params.id);

    if (movie) {
        await movie.deleteOne();
        res.json({ message: 'Movie removed' });
    } else {
        res.status(404);
        throw new Error('Movie not found');
    }
});

module.exports = {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
};
