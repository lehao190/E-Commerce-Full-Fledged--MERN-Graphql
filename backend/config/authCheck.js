const User = require("../models/userSchema");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
    // Check For JWT Token
    async checkAuth(req, tokenValidator) {
        if(req.session.jwt) {
            try {
                const decodedToken = tokenValidator(req.session.jwt);

                const user = await User.findOne({
                    _id: decodedToken.id
                });

                return user;
            } catch (error) {
                throw error;
            }
        }
        
        throw new AuthenticationError("Token needed !!!");
    },

}