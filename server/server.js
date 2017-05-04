var express = require('express')
var session = require('client-sessions');
var login = require('./routes/login');
var logout = require('./routes/logout');
var userInfo = require('./routes/user-info');
var clientRoutes = require('./routes/client-routes');
var matchingFoods = require('./routes/matching-foods');
var dailyGoal = require('./routes/daily-goal');
var dailyIntake = require('./routes/daily-intake');
var favorites = require('./routes/favorites');
var latest = require('./routes/latest');

var port = process.env.PORT || 3000;
var app = express();

app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));

app.use('/login', login);
app.use('/logout', logout);
app.use('/user-info', userInfo);
app.use('/matching-foods', matchingFoods);
app.use('/daily-goal', dailyGoal);
app.use('/daily-intake', dailyIntake);
app.use('/favorites', favorites);
app.use('/latest', latest);

app.use(express.static(require('path').join(__dirname, '../client/app')));
app.use('*', clientRoutes);

app.listen(port, () => console.log('Listening at port ' + port));
