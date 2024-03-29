const fileStream = require("fs");
const { UserInputError } = require("apollo-server-express");
const Product = require("../../models/productSchema");
const { tokenValidator } = require("../../config/jwtAuth");
const { checkAuth } = require("../../config/authCheck");
const { validCreateProduct } = require("../../config/validate");

module.exports = {
    // Product Query
    Query: {
        // Select all products
        async products() {
            console.log("Products Query get called !!!");

            const products = await Product.find().sort("-createdAt");

            // Check if products exist
            if(!products) {
                return;
            }

            return products;
        },

        // Get one product 
        async product(_, { id: productId }) {
            console.log("One Product Query get called !!!");

            const { 
                id, 
                name, 
                description, 
                image, 
                category, 
                brand, 
                price, 
                countInStock,
                rating,
                users,
                numReviews,
                createdAt,
                updatedAt
            } = await Product.findOne({
                _id: productId
            });

            return {
                id,
                name, 
                description,
                image,
                category, 
                brand, 
                price,
                rating,
                numReviews,
                users,
                countInStock,
                createdAt,
                updatedAt
            }
        }
    },

    // Product Mutation
    Mutation: {
        // Create Product
        async createProduct(_, { file, description, name, category, brand, price, countInStock }, { req }) {
            console.log("Create Product Mutation get Called !!!");
            
            // Check for token
            const user = await checkAuth(req, tokenValidator);

            // Check if user is Admin
            if(!user.isAdmin) {
                throw new UserInputError("Errors in creating product", {
                    errors: {
                        isAdmin: "Không phải Admin"
                    }
                })
            }

            // Check inputs
            const { errors, valid } = validCreateProduct(description, name, category, brand, price, countInStock);

            if(!valid) {
                throw new UserInputError("Errors occured when create product", {
                    errors
                });
            }

            const { createReadStream, filename, mimetype, encoding } = await file;

            const streamPath = `${Math.random()}${filename}`;

            await new Promise((resolve, reject) => {
                const stream = createReadStream();
                stream.pipe(fileStream.createWriteStream("./public/images/" + streamPath)).on("finish", () => {
                    resolve();
                }).on("error", (err) => reject(err));
            });

            // Check for file Size Validation
            const fileSize = fileStream.statSync("./public/images/" + streamPath);
            if(fileSize.size >  2000000.0) {
                // Delete File On Error 
                fileStream.unlink("./public/images/" + streamPath, (err) => {
                    if(err) throw err;
                    console.log("Delete File Successfully: ", streamPath);
                });

                throw new UserInputError("File Exceeded 2MB", {
                    errors: {
                        file: "File vượt quá 2MB"
                    }
                });
            }

            //  Create Product
            let product = new Product({
                name,
                description,
                category,
                brand,
                price,
                countInStock,
                image: streamPath
            });

            await product.save();
        
            return {
                id: product._id,
                ...product._doc
            };
        },

        // Delete Product
        async deleteProduct(_, { id, filename }, { req }) {
            console.log("Delete Product Mutation called !!!");

            // Check for token
            const user = await checkAuth(req, tokenValidator);

            // Check if user is Admin
            if(!user.isAdmin) {
                throw new UserInputError("Errors in creating product", {
                    errors: {
                        isAdmin: "Không phải Admin"
                    }
                })
            }

            // Find and delete
            const product = await Product.deleteOne({
                _id: id
            });

            fileStream.unlink("./public/images/" + filename, (err) => {
                if(err) throw err;
                console.log("Delete File Successfully Mate: ", filename);
            });

            return {
                message: "Delete Product Successfully !!!"
            }
        },

        // Update Product
        async updateProduct(_, { id, file, description, name, category, brand, price, countInStock }, { req }) {
            console.log("Update Product Mutation get Called !!!");
            
            // Check for token
            const user = await checkAuth(req, tokenValidator);

            // Check if user is Admin
            if(!user.isAdmin) {
                throw new UserInputError("Errors in creating product", {
                    errors: {
                        isAdmin: "Không phải Admin"
                    }
                })
            }

            // Check inputs
            const { errors, valid } = validCreateProduct(description, name, category, brand, price, countInStock);
            
            if(!valid) {
                throw new UserInputError("Errors occured when create product", {
                    errors
                });
            }

            const { createReadStream, filename, mimetype, encoding } = await file;

            // File Path
            const streamPath = `${Math.random()}${filename}`;

            await new Promise((resolve, reject) => {
                const stream = createReadStream();
                stream.pipe(fileStream.createWriteStream("./public/images/" + streamPath)).on("finish", () => {
                    resolve();
                }).on("error", (err) => reject(err));
            });

            // Check for file Size Validation
            const fileSize = fileStream.statSync("./public/images/" + streamPath);

            if(fileSize.size >  2000000.0) {
                // Delete File On Error 
                fileStream.unlink("./public/images/" + streamPath, (err) => {
                    if(err) throw err;
                    console.log("Delete File Successfully: ", streamPath);
                });

                throw new UserInputError("File Exceeded 2MB", {
                    errors: {
                        file: "File vượt quá 2MB"
                    }
                });
            }

            let product = await Product.findOne({
                _id: id
            });

            if(!product) {
                throw new UserInputError("No Product Found", {
                    errors: {
                        product: "Không có sản phẩm nào cả !!!"
                    }
                });
            }

            // Find older and delete file on updating
            fileStream.unlink("./public/images/" + product.image, (err) => {
                if(err) throw err;
                console.log("Delete File Successfully: ", product.image);
            });

            product = await Product.findOneAndUpdate(
                {
                    _id: id
                },
                {
                    image: streamPath, 
                    description, 
                    name, 
                    category, 
                    brand, 
                    price, 
                    countInStock
                },
                {
                    new: true
                }
            );

            return {
                id: product._id,
                ...product._doc
            }
        },

        // Create Product's Comment
        async createComment(_, { productId, userId, username, userRating, userComment }, { req }) {
            console.log("Create Product's User Comment Mutation get Called !!!");
            
            // Check for token
            const user = await checkAuth(req, tokenValidator);

            // Check if user exists
            if(!user) {
                throw new UserInputError("Errors in creating product", {
                    errors: {
                        isUser: "Người dùng không tồn tại !!!"
                    }
                });
            }

            // Find Product
            const product = await Product.findOne({
                _id: productId
            });

            const existingUser = product.users.filter(existingUser => {
                return existingUser.userId.toString() === user.id;
            });

            // User has reviewed 
            if(existingUser.length > 0) {
                throw new UserInputError("Errors in creating product", {
                    errors: {
                        isCommentValid: "Bạn Đã Có Nhận Xét !!!"
                    }
                });
            }

            product.users.push({
                userId,
                username,
                userRating,
                userComment,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString() 
            });

            await product.save();

            // get all users's Ratings
            const allRatings = product.users.reduce((a, b) => {
                return a + b.userRating;
            }, 0);

            // User's Review
            product.numReviews += 1;

            // Average Rating Number
            product.rating = allRatings/product.users.length;

            await product.save();

            const {
                id, 
                name, 
                description, 
                image, 
                category, 
                brand, 
                price, 
                countInStock,
                rating,
                users,
                numReviews,
                createdAt,
                updatedAt
            } = product;

            return {
                id,
                name, 
                description,
                image,
                category, 
                brand, 
                price,
                rating,
                numReviews,
                users,
                countInStock,
                createdAt,
                updatedAt
            }
        }
    }
}