import React from 'react';
import Item from '../components/Item';

function ProductList() {
    return (
        <div id="product-list-container">
            <div>
                <div>
                    <h1>SẢN PHẨM</h1>
                </div>

                <div>
                    <div>+ TẠO SẢN PHẨM</div>
                </div>
            </div>

            <div>
                <table className="table-dashboard">
                    <thead>
                        <tr>
                            <td><h1>ID</h1></td>
                            <td><h1>Tên</h1></td>
                            <td><h1>Giá</h1></td>
                            <td><h1>Loại</h1></td>
                            <td><h1>Nhãn Hiệu</h1></td>
                        </tr>
                    </thead>

                    <tbody>
                        <Item/>
                        <Item/>
                        <Item/>
                        <Item/>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductList
