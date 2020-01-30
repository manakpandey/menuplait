const logger = require('./winston');
const User = require('./models/user.model');

exports.verifyUser = (username, password, done) => {
  User.findById(username, (err, user) => {
    if (err) {
      logger.error(err);
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  });
};
