const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { urlencoded, json } = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('./winston');
const { dbUrl, secretKey } = require('./config');
const customerRouter = require('./routes/menu.route');
const adminRouter = require('./routes/admin.route');
const { verifyUser } = require('./login');
const User = require('./models/user.model');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
}));
app.use(cookieParser());
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', customerRouter);
app.use('/admin', adminRouter);

passport.use(new LocalStrategy((username, password, done) => verifyUser(username, password, done)));
passport.serializeUser((user, done) => { done(null, user.id); });
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('Successful connection to Database');
  })
  .catch((error) => {
    logger.error(`Connection Error: ${error}`);
  });

app.listen(port, () => logger.info(`App Listening on port ${port}`));
