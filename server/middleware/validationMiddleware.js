const Joi = require('joi');

const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            res.status(400);
            throw new Error(error.details[0].message);
        }
        next();
    };
};

const movieSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    genre: Joi.string().required(),
    releaseDate: Joi.date().required(),
    trailerUrl: Joi.string().uri().required(),
    posterUrl: Joi.string().uri().required(),
});

const reviewSchema = Joi.object({
    rating: Joi.number().min(1).max(10).required(),
    comment: Joi.string().required(),
    title: Joi.string().required(),
});

const userSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

module.exports = { validate, movieSchema, reviewSchema, userSchema };
