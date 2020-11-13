import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { PRODUCT_CREATE } from "../graphql/Mutations/productMutations";
import { PRODUCTS } from "../graphql/Queries/productQueries";

// Create Product Page
function CreateProduct(props) {
    const [createProduct] = useMutation(PRODUCT_CREATE);
    
    const [errors, setErrors] = useState("");
    const [upload, setUpload] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState(0);
    const [countInStock, setCountInStock] = useState(0);
    
    function onChange({
        target: {
            validity,
            files: [file],
        },
    }) {
        if (validity.valid) setUpload(file);
    };

    const onSubmit = async(e) => {
        e.preventDefault();
        
        try {
            await createProduct({ 
                variables: { 
                    file: upload,
                    name,
                    description,
                    category,
                    brand,
                    price: Number(price),
                    countInStock: Number(countInStock)
                },
                update: async (cache, { data: { createProduct } }) => {
                    const existingProducts = await cache.readQuery({
                        query: PRODUCTS
                    });

                    cache.evict({
                        fieldName: "notifications",
                        broadcast: false
                    });

                    const newProduct = createProduct;

                    cache.writeQuery({
                        query: PRODUCTS,
                        data: {
                            products: [newProduct, ...existingProducts.products]
                        },
                    });

                    setErrors("");
                    
                    props.history.push({
                        pathname: "/"
                    });  
                },
            });
        } catch (error) {
            setErrors(error.graphQLErrors[0].extensions.errors);
            return null;
        }
    }

    return (
        <div className="wrapper" style={{height: "unset"}}>
            <div className="container" style={{marginTop: "40px", marginBottom: "40px"}}>
                <form onSubmit={onSubmit} className="login-form" encType="multipart/form-data">
                    <small>TẠO SẢN PHẨM</small>
                 
                    <div style={{color: "red"}}>
                        {errors && errors.isAdmin}
                    </div>

                    <div className="form-control">
                        <label htmlFor="name">Tên sản phẩm</label>
                        <input type="text" onChange={ e => setName(e.target.value) } name="name" id="name" placeholder="Nhập vào tên sản phẩm" />
                    </div>

                    <div style={{color: "red"}}>
                        {errors && errors.name}
                    </div>

                    <div className="form-control">
                        <label htmlFor="description">Chi tiết</label>
                        <textarea onChange={ e => setDescription(e.target.value) } name="description" required type="text" id="description" placeholder="Nhập chi tiết sản phẩm" />
                    </div>

                    <div style={{color: "red"}}>
                        {errors && errors.description}
                    </div>

                    <div className="form-control">
                        <label htmlFor="category">Loại hàng</label>
                        <input onChange={ e => setCategory(e.target.value) } type="text" name="category" id="category" placeholder="Nhập vào loại hàng"/>
                    </div>

                    <div style={{color: "red"}}>
                        {errors && errors.category}
                    </div>

                    <div className="form-control">
                        <label htmlFor="brand">Nhãn hiệu</label>
                        <input onChange={ e => setBrand(e.target.value) } type="text" name="brand" id="brand" placeholder="Nhập vào nhãn hiệu"/>
                    </div>

                    <div style={{color: "red"}}>
                        {errors && errors.brand}
                    </div>

                    <div className="form-control">
                        <label htmlFor="price">Giá hàng ($)</label>
                        <input onChange={ e => setPrice(e.target.value) } type="text" name="price" id="price" placeholder="Nhập vào giá sản phẩm"/>
                    </div>

                    <div style={{color: "red"}}>
                        {errors && errors.price}
                    </div>

                    <div className="form-control">
                        <label htmlFor="countInStock">Số lượng sản phẩm</label>
                        <input onChange={ e => setCountInStock(e.target.value) } min={0} type="number" name="countInStock" id="countInStock" placeholder="Nhập vào số lượng sản phẩm"/>
                    </div>

                    <div style={{color: "red"}}>
                        {errors && errors.countInStock}
                    </div>

                    <div className="form-control">
                        <label htmlFor="file">Hình sản phẩm(JPG, JPEG, PNG)</label>
                        <input type="file" required onChange={onChange}/>
                    </div>

                    <div style={{color: "red"}}>
                        {errors && errors.file}
                    </div>

                    <button className="btn">TẠO</button>
                </form>
            </div>
        </div> 
    )
}

export default CreateProduct