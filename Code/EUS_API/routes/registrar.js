
const Course = require('../models/Course');
const verifyApi = require('../VerifyApi');
const errors = require('restify-errors');
const User = require('../models/User')


module.exports = server => {

    server.post('/createClass', verifyApi, async (req, res, next) => {


        if (req.role > 1) {
            return next(new errors.UnauthorizedError("Role authorization problem"));
        }

        if (!req.is('application/json')) {
            return next(
                new errors.InvalidContentError("Expects 'application/json'")
            );
        }

        const { name, faculty, department, lecturer, timetable } = req.body;

        const cl = new Course({
            name,
            faculty,
            department,
            lecturer,
            timetable
        });

        try {
            const newClass = await cl.save();
            res.send(201);
            next();
        } catch (err) {
            return next(new errors.InternalError(err.message));
        }

        try {

            const updateLec = await User.findById(lecturer)
            updateLec.courseslist.push(cl.id);
            updateLec.save();

        } catch (err) {
            return next(new errors.InternalError("lecturer not updated"))
        }


    }
    );

};