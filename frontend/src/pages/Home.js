import React, { useState, useEffect } from 'react';
import Products from '../components/Products';
import { useQuery } from "@apollo/client";
import { PRODUCTS } from "../graphql/Queries/productQueries";

function Home() {
    // Fetch Products
    const { loading, error, data } = useQuery(PRODUCTS);

    const [] = useState(data);

    useEffect(() => {

    }, []);

    return (
        <div id="home-container">
            <div className="product-list">
                <div>
                    SẢN PHẨM MỚI NHẤT
                </div>

                <div className="filter">
                    <div>
                        Giá nhỏ nhất: <input type="number"/>
                    </div>
                    <div>
                        Giá lớn nhất: <input type="number"/>
                    </div>
                    <div>
                        Tìm theo tên: <input type="text"/>
                    </div>
                </div>

                <div className="product-container">
                    { loading && loading }
                    {error && console.log(error.graphQLErrors[0].extensions)}
                    { data && data.products.map(product => {
                        return <Products key={product.id} product={product}/>
                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default Home
