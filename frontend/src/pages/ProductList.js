import { useQuery } from '@apollo/client';
import React from 'react';
import Item from '../components/Item';
import { ME } from "../graphql/Queries/userQueries";
import { PRODUCTS } from "../graphql/Queries/productQueries";
import { Link } from 'react-router-dom';

function ProductList(props) {
    const { data: user } = useQuery(ME);

    const { loading, data } = useQuery(PRODUCTS);
    
    if(user && !user.me.isAdmin) return <div>Not admin</div>
    
    if(!user) return <div>No User Found</div>

    return (
        <div id="product-list-container">
            <div>
                <div>
                    <h1>SẢN PHẨM</h1>
                </div>

                <div>
                    <div><Link to="/products/create" style={{color: "white"}}>+ TẠO SẢN PHẨM</Link></div>
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
                        {loading && loading}
                        {data && data.products.map((product) => {
                            return <Item key={product.id} product={product} history={props.history}/>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductList
