const logger = require('./winston');
const User = require('./models/user.model');

exports.verifyUser = (username, password, done) => {
  logger.debug(username);
  User.findById(username, (err, user) => {
    if (err) {
      logger.error(err);
      return done(err);
    }
    if (!user) {
      logger.debug('Incorrect Username');
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (!user.validPassword(password)) {
      logger.debug('Incorrect Password');
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  });
};
