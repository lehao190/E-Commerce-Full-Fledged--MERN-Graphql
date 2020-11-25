import React from 'react';
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { ME } from "../graphql/Queries/userQueries";
import { LOGOUT } from "../graphql/Mutations/userMutations";
import Cookies from "js-cookie";

// Navigation Bar
function Navbar() {
    // Default state of logging-in
    if(!Cookies.getJSON("isLoggedIn")) {
        Cookies.set("isLoggedIn", { state: false });
    } 

    const loggedIn = Cookies.getJSON("isLoggedIn");

    // Fetch for user 
    const { data, client } = useQuery(ME, {
        fetchPolicy: "cache-and-network"
    });

    // Log user out
    const [logOut] = useMutation(LOGOUT);

    const onClick = async () => {
        try {
            await logOut();
        } catch (error) {
            return null;
        }
    }
   
    return (
        <nav id="navbar">
            <div>
                <div className="shopping">
                    <Link to="/"><i className="fab fa-shopify"></i></Link>
                </div>
            </div>
            <div>
                <div>
                    <div className="navbar-cart">
                        <Link to="/cart">Giỏ Hàng</Link>
                    </div>

                    {
                        loggedIn.state === false &&
                        <div className="navbar-login">
                            <Link to="/login">Đăng Nhập</Link>
                        </div>
                    }
                    {
                        data &&
                            <div className="navbar-login">
                                {data.me && data.me.username}
                                <div className="user-options">
                                    <div><Link to="/checkout/orderlist">Đơn Hàng</Link></div>
                                    <div><Link to="/products/productlist">Sản Phẩm</Link></div>
                                    <div onClick={() => {
                                        onClick().then(() => {
                                            Cookies.set("isLoggedIn", { state: false });
                                            client.resetStore().catch(err => {
                                                return null;
                                            });
                                        })
                                    }}>Đăng Xuất</div>
                                </div>
                            </div>        
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
