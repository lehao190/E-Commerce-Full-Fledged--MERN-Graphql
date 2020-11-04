import React, { useEffect, useState } from 'react';
import { useMutation } from "@apollo/client";
import { PRODUCT_CREATE } from "../graphql/Mutations/createProduct"

// Create Product Page
function CreateProduct() {
    const [mutate, {loading: mutationFile, error: mutationError, data: mutationData}] = useMutation(PRODUCT_CREATE);

    const [upload, setUpload] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState(0);
    const [countInStock, setCountInStock] = useState(0);
    
    useEffect(() => {
        if(mutationError) {
            console.log(mutationError.graphQLErrors[0]);
        }
    })

    function onChange({
        target: {
            validity,
            files: [file],
        },
    }) {
        if (validity.valid) setUpload(file);
    }

    const onSubmit = async(e) => {
        e.preventDefault();
        
        try {
            await mutate({ 
                variables: { 
                    file: upload,
                    name,
                    description,
                    category,
                    brand,
                    price: Number(price),
                    countInStock: Number(countInStock)
                } 
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    return (
        <div className="wrapper" style={{height: "unset"}}>
            <div className="container" style={{marginTop: "40px", marginBottom: "40px"}}>
                <form onSubmit={onSubmit} className="login-form" encType="multipart/form-data">
                    <small>TẠO SẢN PHẨM</small>
                 
                    {/* {mutationData && mutationData.singleUpload.filename} */}

                    <div className="form-control">
                        <label htmlFor="name">Tên sản phẩm</label>
                        <input type="text" onChange={ e => setName(e.target.value) } name="name" id="name" placeholder="Nhập vào email" />
                    </div>

                    <div className="form-control">
                        <label htmlFor="description">Chi tiết</label>
                        <textarea onChange={ e => setDescription(e.target.value) } name="description" required type="text" id="description" />
                    </div>

                    <div className="form-control">
                        <label htmlFor="category">Loại hàng</label>
                        <input onChange={ e => setCategory(e.target.value) } type="text" name="category" id="category"/>
                    </div>

                    <div className="form-control">
                        <label htmlFor="brand">Nhãn hiệu</label>
                        <input onChange={ e => setBrand(e.target.value) } type="text" name="brand" id="brand"/>
                    </div>

                    <div className="form-control">
                        <label htmlFor="price">Giá hàng ($)</label>
                        <input onChange={ e => setPrice(e.target.value) } type="text" name="price" id="price"/>
                    </div>

                    <div className="form-control">
                        <label htmlFor="countInStock">Số lượng sản phẩm</label>
                        <input onChange={ e => setCountInStock(e.target.value) } min={0} type="number" name="countInStock" id="countInStock"/>
                    </div>

                    <div className="form-control">
                        <label htmlFor="file">Hình sản phẩm(JPG, JPEG, PNG)</label>
                        <input type="file" required onChange={onChange}/>
                    </div>

                    {mutationError && mutationError.graphQLErrors[0].extensions.errors.file}

                    <button className="btn">TẠO</button>
                </form>
            </div>
        </div> 
    )
}

export default CreateProduct
