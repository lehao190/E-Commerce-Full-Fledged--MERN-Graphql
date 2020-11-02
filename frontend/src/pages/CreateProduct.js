import React, { useEffect, useState } from 'react';
import { useMutation } from "@apollo/client";
import { UPLOAD } from "../graphql/Mutations/createProduct"

// Create Product Page
function CreateProduct() {
    const [mutate, {loading: mutationFile, error: mutationError, data: mutationData}] = useMutation(UPLOAD);

    const [upload, setUpload] = useState("");
    
    useEffect(() => {
        if(mutationError) {
            console.log(mutationError.graphQLErrors[0])
        }
    })

    function onChange({
        target: {
        validity,
        files: [file],
        },
    }) {
        console.log(file);
        if (validity.valid) setUpload(file)
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        
        try {
            await mutate({ variables: { file: upload } })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="wrapper">
            <div className="container">
                <form onSubmit={onSubmit} className="login-form" encType="multipart/form-data">
                    <small>TẠO SẢN PHẨM</small>
                 
                    {mutationError && mutationError.graphQLErrors[0].extensions.errors.file}
                    {/* {mutationData && mutationData.singleUpload.filename} */}

                    {/* <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="Nhập vào email" />
                    </div> */}

                    <input type="file" required onChange={onChange}/>

                    <button className="btn">TẠO</button>
                </form>
            </div>
        </div> 
    )
}

export default CreateProduct
