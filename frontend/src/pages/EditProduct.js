import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { PRODUCT } from '../graphql/Queries/productQueries';
import { PRODUCT_UPDATE } from '../graphql/Mutations/productMutations';

function EditProduct(props) {
    const [errors, setErrors] = useState("");
    const [upload, setUpload] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState(0);
    const [countInStock, setCountInStock] = useState(0);

    const { loading, error, data } = useQuery(PRODUCT, {
        variables: {
            id: props.match.params.productId
        }
    });

    const [updateProduct] = useMutation(PRODUCT_UPDATE);

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
            await updateProduct({ 
                variables: { 
                    id: props.match.params.productId,
                    file: upload,
                    name,
                    description,
                    category,
                    brand,
                    price: Number(price),
                    countInStock: Number(countInStock)
                },
                update: () => {
                    setErrors("");
                    
                    props.history.push({
                        pathname: "/products/productlist"
                    });
                },
            });
        } catch (error) {
            setErrors(error.graphQLErrors[0].extensions.errors);
            return null;
        }
    }

    if(loading) return <div>Đang lấy dữ liệu ....</div>
    
    if(error) return <div>Xảy ra lỗi trong khi lấy dữ liệu</div>

    if(data){ 
        return (
            <div className="wrapper" style={{height: "unset"}}>
                <div className="container" style={{marginTop: "40px", marginBottom: "40px"}}>
                    <form onSubmit={onSubmit} className="login-form" encType="multipart/form-data">
                        <small>THAY ĐỔI</small>
                    
                        <div style={{color: "red"}}>
                            {errors && errors.isAdmin}
                        </div>

                        <div className="form-control">
                            <label htmlFor="name">Tên sản phẩm</label>
                            <input type="text" onChange={ e => setName(e.target.value) } name="name" id="name" placeholder={data.product.name} />
                        </div>

                        <div style={{color: "red"}}>
                            {errors && errors.name}
                        </div>

                        <div className="form-control">
                            <label htmlFor="description">Chi tiết</label>
                            <textarea onChange={ e => setDescription(e.target.value) } name="description" required type="text" id="description" placeholder={data.product.description} />
                        </div>

                        <div style={{color: "red"}}>
                            {errors && errors.description}
                        </div>

                        <div className="form-control">
                            <label htmlFor="category">Loại hàng</label>
                            <input onChange={ e => setCategory(e.target.value) } type="text" name="category" id="category" placeholder={data.product.category}/>
                        </div>

                        <div style={{color: "red"}}>
                            {errors && errors.category}
                        </div>

                        <div className="form-control">
                            <label htmlFor="brand">Nhãn hiệu</label>
                            <input onChange={ e => setBrand(e.target.value) } type="text" name="brand" id="brand" placeholder={data.product.brand}/>
                        </div>

                        <div style={{color: "red"}}>
                            {errors && errors.brand}
                        </div>

                        <div className="form-control">
                            <label htmlFor="price">Giá hàng ($)</label>
                            <input onChange={ e => setPrice(e.target.value) } type="text" name="price" id="price" placeholder={data.product.price}/>
                        </div>

                        <div style={{color: "red"}}>
                            {errors && errors.price}
                        </div>

                        <div className="form-control">
                            <label htmlFor="countInStock">Số lượng sản phẩm</label>
                            <input onChange={ e => setCountInStock(e.target.value) } min={0} type="number" name="countInStock" id="countInStock" placeholder={data.product.countInStock}/>
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

                        <button className="btn">THAY ĐỔI</button>
                    </form>
                </div>
            </div> 
        )
    }
}

export default EditProduct
