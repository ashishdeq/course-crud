//Import the necessary packages
const express = require('express');
var app = express();
const path = require('path');
const mongoose = require('mongoose');
const exphb = require('express-handlebars');
const bodyparser = require('body-parser');
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const courseController = require('./controllers/courseController');
const routes = require("./routes/routers");
app.use(bodyparser.urlencoded({
    extended: true
}));
mongoose.connect('mongodb://localhost:27017/coursecrud', { useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log('Successfully Established Connection with MongoDB')
    }
    else {
        console.log('Failed to Establish Connection with MongoDB with Error: ' + err)
    }
});


//Create a welcome message and direct them to the main page
app.get('/', (req, res) => {
    res.send('<h2 style="font-family: Malgun Gothic; color: midnightblue ">Welcome to Deqode</h2> Click Here to go to <b> <a href="/course">Course Page</a> </b>');
});
app.use(bodyparser.json());

//Configuring Express middleware for the handlebars
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphb({
    extname: 'hbs', handlebars: allowInsecurePrototypeAccess(Handlebars)
    , defaultLayout: 'mainLayout', layoutDir: __dirname + 'views/layouts/'
}));
app.set('view engine', 'hbs');
app.use('/', routes);
//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
