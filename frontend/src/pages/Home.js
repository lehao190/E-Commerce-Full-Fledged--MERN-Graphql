import React, { useState, useEffect } from 'react';
import Products from '../components/Products';
import { useQuery } from "@apollo/client";
import { PRODUCTS } from "../graphql/Queries/productQueries";

function Home() {
    // Fetch Products
    const { loading, error, data } = useQuery(PRODUCTS);

    const [products, setProducts] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        let filteredProducts = [];

        if(!loading && data) {
            setProducts(data.products);

            filteredProducts = data.products;
        }

        // Filter Minmum Price
        if(minPrice) {
            filteredProducts = filteredProducts.filter(product => product.price >= minPrice);
        }

        // Filter Maximum Price
        if(maxPrice) {
            filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
        }

        // Filter Name
        const re = new RegExp(name + '.+$', 'ig');

        if(name) {
            filteredProducts = filteredProducts.filter( product => product.name.match(re));
        }

        if(filteredProducts.length > 0) {
            setProducts(filteredProducts);
        }

        if(filteredProducts.length === 0 && data) {
            setProducts("");
        }

    }, [loading, minPrice, maxPrice, name, data]);

    if(loading) return <div>Đang lấy dữ liệu...</div>
    
    if(error) return <div>Đã xảy ra lỗi !!!</div>

    if(data || products){
        return (
            <div id="home-container">
                <div className="product-list">
                    <div>
                        SẢN PHẨM MỚI NHẤT
                    </div>

                    <div className="filter">
                        <div>
                            Giá nhỏ nhất: <input type="number" onChange={ e => setMinPrice(e.target.value) } />
                        </div>
                        <div>
                            Giá lớn nhất: <input type="number" onChange={ e => setMaxPrice(e.target.value) } />
                        </div>
                        <div>
                            Tìm theo tên: <input type="text" onChange={ e => setName(e.target.value) } />
                        </div>
                    </div>
                    {
                        products &&
                        <div className="product-container">
                                {
                                    products.map(product => {
                                        return <Products key={product.id} product={product}/>
                                    })
                                }
                        </div>
                    }

                    {
                        products.length === 0 &&
                        <div className="product-container" style={{
                            display: "block"
                        }}>
                            <div style={{
                                fontWeight: "bold",
                                fontSize: "1.5rem",
                                textAlign: "center"
                            }}>
                                Không Có Sản Phẩm Nào Trùng Khớp Bộ Lọc !!!
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Home
