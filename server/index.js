const express = require('express');
const app = express();
const dbConfig = require('./config/dbConfig');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);


app.listen(8082, () => {
    console.log("Server started...");
});