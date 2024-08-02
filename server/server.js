const express = require("express");
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // To store sessions in MongoDB
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
require('./services/passport-setup');

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');

// Express App
const app = express();


const corsOptions = {
    origin: ['http://localhost:3000', 'https://gooodjob.xyz'],
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());


// Debugging middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    res.on('finish', () => {
        console.log(res.getHeaders());
    });
    next();
});

const mongoose = require('mongoose');
const db = process.env.ATLAS_URI;
const local_app_port = process.env.PORT;
mongoose.connect(db)
.then(() => {
    app.listen(local_app_port, () => {
        console.log("MongoDB Atlas Status: Connected");
        console.log(`Listening on http://localhost:${local_app_port}`);
    });
})
.catch((error) => {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
});


// Express session setup
app.use(session({
    secret: process.env.COOKIE_KEY, // Secure key generated earlier
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.ATLAS_URI }),
    cookie: { maxAge: 90 * 24 * 60 * 60 * 1000 }
}));


// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth/', authRoutes);

app.use('/user/', userRoutes);
app.use('/admin/', adminRoutes);
