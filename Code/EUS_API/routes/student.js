
const verifyApi = require('../VerifyApi');
const errors = require('restify-errors');
const Course = require('../models/Course');
const User = require('../models/User');

module.exports = server => {


    server.post('/student/setCourses', verifyApi, async (req, res, next) => {

        if (!req.is('application/json')) {
            return next(
                new errors.InvalidContentError("Expects 'application/json'")
            );
        }

        try {

            selectedCoursesList = req.body.courseslist;

            const studentObj = await User.findByIdAndUpdate(req.userId, { $set: { "courseslist": selectedCoursesList } });
            newstObj = { id: req.userId }
            courseObj = await Course.updateMany({ _id: { $in: selectedCoursesList } }, { $push: { students: newstObj } });


            res.send();
            next();
        } catch (err) {
            return next(new errors.InvalidContentError("Cannot set Courses"));
        }


    });

    server.post('/student/getCourseInfo', verifyApi, async (req, res, next) => {

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

            query = await Course.find({ _id: { $in: courseList } }, { students: { $elemMatch: { id: req.userId } } });

            res.send(query);
            next();

        } catch (err) {
            return next(new errors.InvalidContentError("Cannot find student"));
        }



    });

};