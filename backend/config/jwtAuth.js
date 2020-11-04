const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

module.exports = {
    // Create Token for user
    tokenGenerator(id, username, email, isAdmin, req) {
        const token = jwt.sign(
            {
                id,
                username,
                email,
                isAdmin
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );
        
        // Create session for jwt for authentication
        req.session.jwt = token;

        return token;
    },

    // Validate the token
    tokenValidator(token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    },

};