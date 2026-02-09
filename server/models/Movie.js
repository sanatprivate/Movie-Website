const mongoose = require('mongoose');

const movieSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
            required: true,
        },
        releaseDate: {
            type: Date,
            required: true,
        },
        trailerUrl: {
            type: String,
            required: true,
        },
        posterUrl: {
            type: String,
            required: true,
        },
        averageRating: {
            type: Number,
            default: 0,
        },
        isPremium: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
