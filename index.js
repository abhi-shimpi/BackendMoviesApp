const express = require('express');
const mongoose = require('./config/mongoose');
const app = express();
const userController = require('./controllers/UserController');
const watchlistMoviesController = require('./controllers/WatchlistMoviesController');
const cors = require('cors');

app.use(express.json());
app.use(cors())

/*For user APIs*/
app.use("/user", userController);
/* For movies APIs */
app.use("/user/movies", watchlistMoviesController);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
