import React from 'react';
import Products from '../components/Products';

function Home() {
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
                    <Products/>
                    <Products/>
                    <Products/>
                    <Products/>
                    <Products/>
                    <Products/>
                </div>
            </div>
        </div>
    )
}

export default Home
