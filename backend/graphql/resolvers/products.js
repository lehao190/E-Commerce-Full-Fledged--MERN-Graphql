const fileStream = require("fs");
const { UserInputError } = require("apollo-server-express");

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
        async singleUpload(_, { file }) {
            const { createReadStream, filename, mimetype, encoding } = await file;

            const streamPath = `./public/images/${Math.random()}${filename}`;

            await new Promise((resolve, reject) => {
                const stream = createReadStream();
                stream.pipe(fileStream.createWriteStream(streamPath)).on("finish", () => {
                    resolve();
                }).on("error", (err) => reject(err));
            });

             // Check for file Size Validation
             const fileSize = fileStream.statSync(streamPath);
             if(fileSize.size >  2000000.0) {
                // Delete File On Error 
                fileStream.unlink(streamPath, (err) => {
                    if(err) throw err;
                    console.log("Delete File Successfully: ", streamPath);
                });

                throw new UserInputError("File Exceeded 2MB", {
                    errors: {
                        file: "File vượt quá 2MB"
                    }
                });
             }

            return file;
        }
    }
}