const config = require('../config');
const verifyApi = require('../VerifyApi');
const errors = require('restify-errors');
const Course = require('../models/Course');

module.exports = server => {

    server.post('/getCourses', verifyApi, async (req, res, next) => {

        try {

            query = await Course.find({});

            newQuery = [];
            for (i = 0; i < query.length; i++) {
                newQuery.push([query[i].name, query[i]._id]);

            }
            res.send(newQuery)
            next()
        } catch (err) {
            return next(new errors.InvalidContentError("Cannot get Courses"));
        }


    });



    server.post('/getNotification', verifyApi, async (req, res, next) => {


    });

    server.post('/getTimetable', verifyApi, async (req, res, next) => {


    });



    server.post('/getCourseInfo', verifyApi, async (req, res, next) => {


    });



};