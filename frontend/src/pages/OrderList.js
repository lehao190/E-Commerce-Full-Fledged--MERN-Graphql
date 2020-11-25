import React from 'react';
import { useQuery } from '@apollo/client';
import { ME } from "../graphql/Queries/userQueries";
import { ORDERS } from "../graphql/Queries/orderQueries";
import Item from '../components/Item';

function OrderList(props) {
    const { data: user } = useQuery(ME);

    // Fetch Orders
    const { loading, data } = useQuery(ORDERS, {
        skip: !user
    });

    if(!user) return <div>Người Dùng Không Tồn Tại</div>

    if(loading) return <div>Đang Lấy Dữ liệu ...</div>
    
    if(data) {
        const { orders } = data;

        return (
            <div id="order-list-container">
                <div>
                    <div>
                        <h1>ĐƠN HÀNG</h1>
                    </div>
                </div>

                <div>
                    <table className="table-dashboard">
                        <thead>
                            <tr>
                                <td><h1>ID</h1></td>
                                <td><h1>Tên</h1></td>
                                <td><h1>Tổng giá</h1></td>
                                <td><h1>Đã trả</h1></td>
                                <td><h1>Đã giao</h1></td>
                            </tr>
                        </thead>

                        <tbody>
                            {orders && orders.map((order) => {
                                return <Item key={order.id} order={order} history={props.history}/>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default OrderList
