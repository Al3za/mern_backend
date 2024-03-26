require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500;
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

console.log(process.env.NODE_ENV, 'check env')
connectDB();

app.use(cors(corsOptions));
app.use(express.json())
app.use('/', express.static(path.join(__dirname, '/public')));
// app.use('/', express.static('public')); work also this way
app.use('/users', require('./routes/userRoutes'));
app.use('/', require('./routes/root'))


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () =>
        console.log(`Server running on port ${PORT} `)
    );
});

mongoose.connection.on('error',err => {
    console.log('errore connessione',err)
})


