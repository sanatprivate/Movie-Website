const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 10,
        },
        comment: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Movie',
        },
    },
    {
        timestamps: true,
    }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
