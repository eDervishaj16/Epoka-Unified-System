
const Course = require('../models/Course');
const verifyApi = require('../VerifyApi');
const errors = require('restify-errors');
const User = require('../models/User')


module.exports = server => {

    server.post('/lecturer/postNotification', verifyApi, async (req, res, next) => {
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



    server.post('/lecturer/getTimetable', verifyApi, async (req, res, next) => {
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
    
    server.post('/lecturer/getCourseInfo', verifyApi, async (req, res, next) => {
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
            const studentsid= req.body.studentsId;
            gradeObj={grade:100,weight:100}
            query=await Course.findById(courseid,{students:{$elemMatch:{id:studentsid}}});
            // query=await Course.findOneAndUpdate(courseid,st)
            // courseObj = await Course.updateMany({ _id: { $in: selectedCoursesList } }, { $push: { students: newstObj } });
            
            
            

            res.send(query);

            next();

        } catch (err) {
            return next(new errors.InvalidContentError("Cannot find lecturer"));
        }


        }
    );

    




};