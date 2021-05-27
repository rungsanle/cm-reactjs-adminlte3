const jwt = require('jsonwebtoken');
const env = require('../config/env');
// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

exports.verifyToken = (req, res, next) => {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined 
    if(typeof bearerHeader !== 'undefined' && bearerHeader.startsWith("Bearer ")) {
        // Get token from array
        const bearerToken = bearerHeader.substring(7);
        // verify token
        jwt.verify(bearerToken, env.secretkey, (err, auth) => {

            if (err) {
                res.sendStatus(403);
                return;
            }
            // Next middleware
            next();
        });

    } else {
        // Forbidden
        res.sendStatus(403);
    }

};
