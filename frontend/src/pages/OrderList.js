import React from 'react';
import Item from '../components/Item';

function OrderList() {
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

export default OrderList
