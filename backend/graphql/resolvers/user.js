const { validLogin, validRegister } = require("../../config/validate");
const { tokenGenerator, tokenValidator } = require("../../config/jwtAuth");
const bcrypt = require("bcryptjs");
const { UserInputError } = require("apollo-server-express"); 
const User = require("../../models/userSchema");
const { checkAuth } = require("../../config/authCheck");

module.exports = {
    // Query Resolvers
    Query: {
        // Query User's Info
        async me(_, __, { req }) {
            console.log("Query user get called !!!");

            // Find if user has JWT Token 
            const user = await checkAuth(req, tokenValidator);

            if(user) {
                return {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin
                }
            }

            // throw new AuthenticationError("Token needed !!!");

            // if(req.session.jwt) {
            //     try {
            //         const decodedToken = tokenValidator(req.session.jwt);

            //         const user = await User.findOne({
            //             _id: decodedToken.id
            //         });
                   
            //         return {
            //             id: user.id,
            //             username: user.username,
            //             email: user.email,
            //             isAdmin: user.isAdmin
            //         }
            //     } catch (error) {
            //         throw error;
            //     }
            // }
        },
    },

    // Mutation Resolvers
    Mutation: {
        // Create User's Account
        async register(_, { username, email, password, confirmPassword }, { req }) {
            console.log("Register Mutation get called!!");

            // Check for user's invalid inputs
            const { errors, valid } = validRegister(username, email, password, confirmPassword);

            if(!valid) {
                throw new UserInputError("Errors occured in register process", {
                    errors
                });
            }

            // Find if user exists
            let user = await User.findOne({
                email
            });
    
            if(user) {
                throw new UserInputError("Errors occured in register process", {
                    errors: {
                        user: "Người dùng đã tồn tại"
                    }
                });
            }

            // Create user
            user = new User({
                username,
                email,
                password: await bcrypt.hash(password, 10),
            });
            await user.save();

            return {
                id: user._id,
                ...user._doc,
                token:tokenGenerator(user._id, user.username, user.email, user.isAdmin, req)
            }
        },

        // Login
        async login(_, { email, password }, { req }) {
            console.log("Login Mutation get called!!");
            // Check for valid inputs
            const { errors, valid } = validLogin(email, password); 

            if(!valid) {
                throw new UserInputError("User invalid inputs", {
                    errors
                })
            }

            // Find user if exists
            const user = await User.findOne({
                email
            });
            
            if(!user) {
                throw new UserInputError("Errors occured in login process", {
                    errors: {
                        user: "Người dùng không tồn tại"
                    }
                });
            }
            
            // Compare password
            if(!await bcrypt.compare(password, user.password)) {
                throw new UserInputError("Wrong password", {
                    errors: {
                        password: "Sai mật khẩu"
                    }
                });
            }
            
            return {
                id: user._id,
                ...user._doc,
                token: tokenGenerator(user._id, user.username, user.email, user.isAdmin, req)
            }
        },

        // Create Admin
        async registerAdmin(_, { username, email, password, confirmPassword }, { req }) {
            console.log("Register Admin Mutation get called!!");
            // Check for user's invalid inputs
            const { errors, valid } = validRegister(username, email, password, confirmPassword);

            if(!valid) {
                throw new UserInputError("Errors occured in register process", {
                    errors
                });
            }

            // Find if user exists
            let user = await User.findOne({
                email
            });
    
            if(user) {
                throw new UserInputError("Errors occured in register process", {
                    errors: {
                        user: "Người dùng đã tồn tại"
                    }
                });
            }

            // Create user
            user = new User({
                username,
                email,
                password: await bcrypt.hash(password, 10),
                isAdmin: true
            });
            await user.save();
            
            return {
                id: user._id,
                ...user._doc,
                token: tokenGenerator(user._id, user.username, user.email, user.isAdmin, req)
            }
        },

        // Log user Out
        async logOut (_, __, { req, res }) {
            console.log("Log out mutation hit !!!");

            req.session.destroy((err) => {
                if(err) {
                    return err;
                }
            });
            res.clearCookie("jwt");

            return {
                message: "Log Out Successfully Mate !!!"
            }
        }
    }
}