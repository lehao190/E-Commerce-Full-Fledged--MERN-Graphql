import { gql } from "@apollo/client";

export const UPLOAD = gql`
    mutation UploadFile($file: Upload!){
        singleUpload(file: $file) {
            filename
            mimetype
        }
    }
`;