
const Course = require('../models/Course');
const verifyApi = require('../VerifyApi');
const errors = require('restify-errors');
const User = require('../models/User')


module.exports = server => {

    server.post('/lecturer/postNotification', verifyApi, async (req, res, next) => {

        if (!req.is('application/json')) {
            return next(
                new errors.InvalidContentError("Expects 'application/json'")
            );
        }
        if (req.role > 2) {
            return next(new errors.UnauthorizedError("Role authorization problem"));
        }
        try {
            const { id, message } = req.body;
            const notObj = await Course.findById(id);
            obj = { "message": message }
            notObj.notifications.push(obj);
            notObj.save();
            res.send(201);
            next();
        } catch (err) {
            return next(new errors.InternalError("Cannot post notification"));
        }

    }
    );



    

    server.post('/lecturer/getCourseInfo', verifyApi, async (req, res, next) => {

        if (!req.is('application/json')) {
            return next(
                new errors.InvalidContentError("Expects 'application/json'")
            );
        }
        if (req.role > 2) {
            return next(new errors.UnauthorizedError("Role authorization problem"));
        }
        try {
            const courseId = req.body.courseId;
            query = await Course.findById(courseId, { students: 1 })
            res.send(query)

            next();

        } catch (err) {
            return next(new errors.InvalidContentError("Cannot find lecturer"));
        }

    }
    );



    server.post('/lecturer/updateStudentGrade', verifyApi, async (req, res, next) => {

        try {
            const courseid = req.body._id
            const studentsid = req.body.studentsId;

            gradeObj = req.body.grades;
            query = await Course.findById(courseid, { students: { $elemMatch: { id: studentsid } } });

            query.students[0].grade.push(gradeObj);

            query.save();

            res.send(201);

            next();

        } catch (err) {
            return next(new errors.InvalidContentError("Cannot find lecturer"));
        }


    }
    );


    server.post('/lecturer/updateStudentAttendance', verifyApi, async (req, res, next) => {

        try {
            const courseid = req.body._id
            const studentsid = req.body.studentsId;

            attObj = [true, false, true];
            query = await Course.findById(courseid, { students: { $elemMatch: { id: studentsid } } });
            for (i = 0; i <= attObj.length - 1; i++) {
                query.students[0].attendance.push(attObj[i]);
            }
            query.save();

            res.send(query.students[0]);

            next();

        } catch (err) {
            return next(new errors.InvalidContentError("Cannot find lecturer"));
        }


    }
    );

};