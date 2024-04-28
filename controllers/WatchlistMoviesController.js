const express = require('express');
const router = express.Router();
const User = require('../model/User');
const { ObjectId } = require('mongoose').Types;

/*Adds movie to watchlist*/
router.post('/add-movie-to-watchlist', (req, res) => {
    const userId = req.body.userId
    const moviesObejct = { ...req.body };
    const { ObjectId } = require('mongoose').Types;

    const objectId = new ObjectId(userId);

    User.findOneAndUpdate(
        { _id: objectId },
        { $push: { watchlistData: moviesObejct } },
        { new: true }
    )
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            return res.json({ message: "Movie added to watchlist successfully" });
        })
        .catch(error => {
            return res.status(500).json({
                error: "Internal server error",
                details: error.message
            });
        })
});

/*Remove movie from watchlist*/
router.post('/remove/watchlisted-movie', (req, res) => {
    const userId = req.body.userId
    const movieId = req.body.movieId;
    const { ObjectId } = require('mongoose').Types;

    const objectId = new ObjectId(userId);

    User.findOneAndUpdate(
        { _id: objectId },
        { $pull: { watchlistData: {movieId : movieId} } },
        { new: true }
    )
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            return res.json({ message: "Movie removed from watchlist successfully" });
        })
        .catch(error => {
            return res.status(500).json({
                error: "Internal server error",
                details: error.message
            });
        })
});

/*Get all watchlisted movies*/
router.get('/:userId/watchlisted-movies', (req, res) => {
    const userId = req.params.userId
    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            return res.json({ data: user.watchlistData });
        })
        .catch(error => {
            return res.status(500).json({
                error: "Internal server error",
                details: error.message
            });
        })
});

module.exports = router;