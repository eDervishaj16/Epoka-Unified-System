const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../auth');
const config = require('../config');
const verifyApi = require('../VerifyApi');

module.exports = server => {

  server.post('/register', (req, res, next) => {
    const { name, email, password } = req.body;

    const user = new User({
      name,
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, async (err, hash) => {
        // Hash Password
        user.password = hash;
        // Save User
        try {
          const newUser = await user.save();
          res.send(201);
          next();
        } catch (err) {
          return next(new errors.InternalError(err.message));
        }
      });
    });
  });


  server.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    try {

      const user = await auth.authenticate(email, password);


      const token = jwt.sign(user.toJSON(), config.JWT_SECRET);



      res.send({ user, token });

      next();
    } catch (err) {

      return next(new errors.UnauthorizedError(err));
    }
  });


  server.post('/getTimetable', verifyApi, async (req, res, next) => {
    if (!req.is('application/json')) {
      return next(
        new errors.InvalidContentError("Expects 'application/json'")
      );
    }
    if (req.role > 2) {
      return next(new errors.UnauthorizedError("Role authorization problem"));
    }

    try {
      lec = await User.findById(req.userId, 'courseslist', (err) => {
        if (err) return new errors.InternalError("Cannot find courses");
      });
      courseList = lec.courseslist;


      timetablequery = await Course.find({ _id: { $in: courseList } }, 'timetable');

      res.send(timetablequery);
      next();

    } catch (err) {
      return next(new errors.InvalidContentError("Cannot get timetable"));
    }


  });




  server.post('/getNotification', verifyApi, async (req, res, next) => {

    if (!req.is('application/json')) {
      return next(
        new errors.InvalidContentError("Expects 'application/json'")
      );
    }

    try {
      student = await User.findById(req.userId, 'courseslist', (err) => {
        if (err) return new errors.InternalError("Cannot find courses");
      });
      courseList = student.courseslist;


      query = await Course.find({ _id: { $in: courseList } }, 'notifications');

      res.send(query);
      next();

    } catch (err) {
      return next(new errors.InvalidContentError("Cannot find student"));
    }

  });

  server.post('/getCourses', verifyApi, async (req, res, next) => {

    if (!req.is('application/json')) {
      return next(
        new errors.InvalidContentError("Expects 'application/json'")
      );
    }

    try {

      query = await Course.find({}, '_id name ', (err) => {
        if (err) return new errors.InternalError("Cannot find course");
      });

      res.send(query);
      next();
    } catch (err) {
      return next(new errors.InvalidContentError("Cannot get Courses"));
    }


  });



};
