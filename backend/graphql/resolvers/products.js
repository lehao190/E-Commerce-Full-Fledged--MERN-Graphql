const fileStream = require("fs");
const { UserInputError } = require("apollo-server-express");
const Product = require("../../models/productSchema");
const { tokenValidator } = require("../../config/jwtAuth");
const { checkAuth } = require("../../config/authCheck");

module.exports = {
    // Product Query
    Query: {
       uploads() {
           console.log('query uploads')
           return [{
               filename: "ahahha",
               mimetype: "mime",
           }]
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
            const product = new Product({
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
        }
    }
}