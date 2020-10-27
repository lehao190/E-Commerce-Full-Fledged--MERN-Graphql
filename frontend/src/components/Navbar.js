import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
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
                        Giỏ Hàng
                    </div>
                    <div className="navbar-login">
                        Đăng Nhập
                        <div className="user-options">
                            <div>Sản Phẩm</div>
                            <div>Đăng Xuất</div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
