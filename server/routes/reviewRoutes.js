const express = require('express');
const router = express.Router();
const {
    getReviews,
    createReview,
    updateReview,
    deleteReview,
    getMyReviews,
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const { validate, reviewSchema } = require('../middleware/validationMiddleware');

router.get('/myreviews', protect, getMyReviews);

router.route('/:movieId')
    .get(getReviews)
    .post(protect, validate(reviewSchema), createReview);

router.route('/:id')
    .put(protect, validate(reviewSchema), updateReview)
    .delete(protect, deleteReview);

module.exports = router;
