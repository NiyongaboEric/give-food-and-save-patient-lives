const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// connect db
mongoose
    .connect('mongodb+srv://niyongabo:niyongabo@mongo01-3sppp.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
    
const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB database connection established'));

//enable cors
app.use(cors());

//Users Routes
const UserRoute = require("./src/routes/User");
app.use('/users', UserRoute);


port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port ${port}`));