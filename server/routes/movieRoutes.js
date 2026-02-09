const express = require('express');
const router = express.Router();
const {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
} = require('../controllers/movieController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/roleMiddleware');
const { validate, movieSchema } = require('../middleware/validationMiddleware');

router.route('/')
    .get(getMovies)
    .post(protect, admin, validate(movieSchema), createMovie);

router.route('/:id')
    .get(getMovieById)
    .put(protect, admin, validate(movieSchema), updateMovie)
    .delete(protect, admin, deleteMovie);

module.exports = router;
