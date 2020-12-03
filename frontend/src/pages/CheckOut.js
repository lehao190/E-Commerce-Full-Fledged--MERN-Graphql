import React, { useState, useEffect } from 'react';
import CartProducts from '../components/CartProducts';
import Paypal from "../components/paypal";
import { useMutation, useQuery } from "@apollo/client";
import Cookies from "js-cookie";
import { ORDER } from '../graphql/Queries/orderQueries';
import { ORDER_DELIVER } from '../graphql/Mutations/orderMutations';
import { ME } from '../graphql/Queries/userQueries';
import moment from "moment";

function CheckOut(props) {
    const isLoggedIn = Cookies.getJSON("isLoggedIn");

    // const [totalPrice, setTotalPrice] = useState(0);
    let totalPrice = 0;

    // Errors
    const [errors, setErrors] = useState("");

    // Make Order Query
    const { loading, error, data } = useQuery(ORDER, {
        variables: {
            id: props.match.params.checkoutId
        }
    });

    // Deliver Order Mutation
    const [deliverOrder] = useMutation(ORDER_DELIVER);

    // Fetch for user 
    const { data: user } = useQuery(ME, {
        fetchPolicy: "cache-and-network"
    });

    // Deliver Items
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await deliverOrder({
                variables: {
                    orderId: props.match.params.checkoutId
                },
                update: () => {
                    setErrors("");
                }
            });
        } catch (error) {
            setErrors(error.graphQLErrors[0].extensions.errors);

            return null;
        }
    };

    // Check if user Logged-In
    useEffect(() => {
        if(!isLoggedIn.state) props.history.push({
            pathname: "/login"
        });
    }, [isLoggedIn.state, props.history]);

    if(loading) return <div>Đang tải...</div>

    if(error || errors) return <div>Lỗi đã xảy ra...</div>

    if(!data || !user) {
        return <div style={{
            fontWeight: "bold",
            fontSize: "1.5rem",
            textAlign: "center"
        }}>Không có món hàng nào !!!!</div>
    }

    if(data && user) {
        const { order } = data;

        return (
            <div id="placeorder-container">
                <div className="cart">
                    <div className="shipping">
                        <h1>NƠI GIAO HÀNG</h1>
                        <div>Người nhận: { order.user.username }</div>
                        <div>Email: { order.user.email }</div>
                        <div>
                            Địa chỉ: 
                            {" " + order.shipping.address + " "}
                            { order.shipping.city + " "}
                            { order.shipping.country + " "}
                        </div>
                        {
                            !order.isDelivered &&
                            <div className="checkout-state warning">
                                Chưa giao hàng !
                            </div>
                        }

                        {
                            order.isDelivered &&
                            <div className="checkout-state success">
                                Đã giao hàng vào lúc: {moment(order.deliveredAt, "x").format("DD / MMMM / YYYY")}
                            </div>
                        }
                    </div>

                    <div className="payment-method">
                        <h1>HÌNH THỨC THANH TOÁN</h1>
                        <div>Hình thức: { order.payment.paymentMethod }</div>
                        {
                            order.isPaid &&
                            <div className="checkout-state success">
                                Đã trả tiền vào: {moment(order.paidAt, "x").format("DD / MMMM / YYYY")}
                            </div>
                        }

                        {
                            !order.isPaid &&
                            <div className="checkout-state warning">
                                Chưa Trả Tiền !
                            </div>
                        }
                    </div>

                    <div className="cart-title">
                        <h1>GIỎ HÀNG</h1>
                    </div>

                    {   
                            order.orderItems &&
                            order.orderItems.map((orderItem) => {
                                return <CartProducts key={orderItem.product.id} orderItem={orderItem} inputs={false}/>
                            })
                    }
                </div>

                <div className="cart-checkout">
                    <div className="add-product">
                        <form onSubmit={onSubmit}>
                            <table>
                                <thead>
                                    <tr>
                                        <td><h1>ĐƠN HÀNG</h1></td>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>
                                            <h1>Lượng hàng: </h1>
                                            <h1>
                                                {
                                                    order.orderItems.reduce((a ,b) => {
                                                        return Number(b.quantity) + a; 
                                                    }, 0)
                                                }
                                            </h1>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <h1>Tổng cộng: </h1>
                                            <h1>
                                                $ 
                                                {
                                                    totalPrice = order.orderItems.reduce((a ,b) => {
                                                        return Number(b.product.price) * Number(b.quantity) + a; 
                                                    }, 0)
                                                }
                                            </h1>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            {
                                                !user.me.isAdmin &&
                                                    <div style={{
                                                        width: "100%"
                                                    }}>
                                                        <Paypal 
                                                            totalPrice={totalPrice}
                                                            orderId={props.match.params.checkoutId}
                                                        />
                                                    </div>
                                            }
                                            {
                                                user.me.isAdmin && !order.isDelivered &&
                                                <button>
                                                    ĐÃ GIAO HÀNG
                                                </button>
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CheckOut
