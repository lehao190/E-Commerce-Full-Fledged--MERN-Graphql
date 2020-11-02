import React from 'react';
import { Link } from "react-router-dom";
import { useQuery, useApolloClient} from "@apollo/client";
import { ME } from "../graphql/Queries/userQueries";
import Cookies from "js-cookie";

// Navigation Bar
function Navbar() {
    const user = useApolloClient().readQuery({query: ME})

    if(!Cookies.getJSON("isLoggedIn")) {
        Cookies.set("isLoggedIn", { state: false });
    } 

    const loggedIn = Cookies.getJSON("isLoggedIn");

    useQuery(ME, {
       skip: user && true,
       fetchPolicy: user && loggedIn.state === true ? "network-only" : !user && loggedIn.state === true ? "cache-first" : "cache-only"
    });
   
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
                        <Link to="/">Giỏ Hàng</Link>
                    </div>

                    {
                        user ?
                            <div className="navbar-login">
                                {user.me.username}
                                <div className="user-options">
                                    <div><Link to="/products/create">Admin</Link></div>
                                    <div><Link to="/products/create">Sản Phẩm</Link></div>
                                    <div>Đăng Xuất</div>
                                </div>
                            </div>
                            :
                            <div className="navbar-login">
                                <Link to="/login">Đăng Nhập</Link>
                            </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
