const verifyApi = require('../VerifyApi');
const errors = require('restify-errors');
const Course = require('../models/Course');
const User = require('../models/User');

module.exports = server => {


    server.post('/admin/changePermission', verifyApi, async (req, res, next) => {

        if (!req.is('application/json')) {
            return next(
                new errors.InvalidContentError("Expects 'application/json'")
            );
        }
        if (req.role > 0) {
            return next(new errors.UnauthorizedError("Role authorization problem"));
        }

        try {
            const { role, id } = req.body;
            query = await User.findByIdAndUpdate(id, { $set: { role: role } });
            res.send(201);
            next();


        } catch (err) {
            return next(new errors.InvalidContentError("Cannot change permisson"));
        }


    });


};