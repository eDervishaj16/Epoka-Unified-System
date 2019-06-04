
const verifyApi = require('../VerifyApi');
const errors = require('restify-errors');
const Course = require('../models/Course');
const User = require('../models/User');

module.exports = server => {

    server.post('/student/getCourses', verifyApi, async (req, res, next) => {

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

    server.post('/student/setCourses', verifyApi, async (req, res, next) => {

        try {

            selectedCoursesList = req.body.courseslist;
            console.log(selectedCoursesList);
            const studentObj = await User.findByIdAndUpdate(req.userId, { $set: { "courseslist": selectedCoursesList } });
            newstObj = { id: req.userId }
            courseObj = await Course.updateMany({ _id: { $in: selectedCoursesList } }, { $push: { students: newstObj } });


            res.send();
            next();
        } catch (err) {
            return next(new errors.InvalidContentError("Cannot set Courses"));
        }


    });



    server.post('/student/getNotification', verifyApi, async (req, res, next) => {

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

    server.post('/student/getTimetable', verifyApi, async (req, res, next) => {
        try {
            student = await User.findById(req.userId, 'courseslist', (err) => {
                if (err) return new errors.InternalError("Cannot find courses");
            });
            courseList = student.courseslist;


            timetablequery = await Course.find({ _id: { $in: courseList } }, 'timetable');

            res.send(timetablequery);
            next();

        } catch (err) {
            return next(new errors.InvalidContentError("Cannot find student"));
        }


    });

    //Needs retesting

    server.post('/student/getCourseInfo', verifyApi, async (req, res, next) => {

        try {
            student = await User.findById(req.userId, 'courseslist', (err) => {
                if (err) return new errors.InternalError("Cannot find courses");
            });
            courseList = student.courseslist;
           
            
           

            
            query = await Course.find({ _id: {$in:courseList} },{students:{$elemMatch:{id:req.userId}}});


            res.send(query);
            next();

        } catch (err) {
            return next(new errors.InvalidContentError("Cannot find student"));
        }



    });



};