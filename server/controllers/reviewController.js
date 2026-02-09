const asyncHandler = require('express-async-handler');
const Review = require('../models/Review');
const Movie = require('../models/Movie');

const getReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({ movie: req.params.movieId }).populate('user', 'username role');
    res.json(reviews);
});

const getMyReviews = asyncHandler(async (req, res) => {
    const reviews = await Review.find({ user: req.user._id }).populate('movie', 'title');
    res.json(reviews);
});

const createReview = asyncHandler(async (req, res) => {
    const { rating, title, comment } = req.body;
    const movie = await Movie.findById(req.params.movieId);

    if (req.user.role === 'admin') {
        res.status(403);
        throw new Error('Admins cannot leave reviews');
    }

    if (movie) {
        const alreadyReviewed = await Review.findOne({
            movie: req.params.movieId,
            user: req.user._id,
        });

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Movie already reviewed');
        }

        const review = await Review.create({
            title,
            rating: Number(rating),
            comment,
            user: req.user._id,
            movie: req.params.movieId,
        });

        const reviews = await Review.find({ movie: req.params.movieId });
        movie.numReviews = reviews.length;
        movie.averageRating =
            reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

        await movie.save();
        res.status(201).json(review);
    } else {
        res.status(404);
        throw new Error('Movie not found');
    }
});

const updateReview = asyncHandler(async (req, res) => {
    const { rating, title, comment } = req.body;
    const review = await Review.findById(req.params.id);

    if (review) {
        if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin' && req.user.role !== 'moderator') {
            res.status(401);
            throw new Error('Not authorized to update review');
        }

        review.title = title || review.title;
        review.comment = comment || review.comment;
        review.rating = rating ? Number(rating) : review.rating;

        const updatedReview = await review.save();

        const reviews = await Review.find({ movie: review.movie });
        const movie = await Movie.findById(review.movie);
        movie.averageRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
        await movie.save();

        res.json(updatedReview);
    } else {
        res.status(404);
        throw new Error('Review not found');
    }
});

const deleteReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.id);

    if (review) {
        if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin' && req.user.role !== 'moderator') {
            res.status(401);
            throw new Error('Not authorized to delete review');
        }

        await review.deleteOne();

        const reviews = await Review.find({ movie: review.movie });
        const movie = await Movie.findById(review.movie);

        if (reviews.length === 0) {
            movie.averageRating = 0;
            movie.numReviews = 0;
        } else {
            movie.numReviews = reviews.length;
            movie.averageRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
        }
        await movie.save();

        res.json({ message: 'Review removed' });
    } else {
        res.status(404);
        throw new Error('Review not found');
    }
});

module.exports = {
    getReviews,
    getMyReviews,
    createReview,
    updateReview,
    deleteReview,
};
