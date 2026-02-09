const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const movies = require('./data/movies');
const User = require('./models/User');
const Movie = require('./models/Movie');
const Review = require('./models/Review');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Review.deleteMany();
        await Movie.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        const sampleMovies = movies.map((movie) => {
            return { ...movie, user: adminUser };
        });

        await Movie.insertMany(sampleMovies);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Review.deleteMany();
        await Movie.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
