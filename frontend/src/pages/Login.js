import React from 'react';
import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="wrapper">
            <div className="container">
                <form className="login-form">
                    <small>ĐĂNG NHẬP</small>

                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="Nhập vào email" />
                    </div>

                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Nhập vào password" />
                    </div>

                    <button className="btn">Đăng Nhập</button>

                    <small>Chưa Có Tài Khoản? <Link className="google-redirect" to="/register">Đăng Ký</Link></small> 
                </form>
            </div>
        </div> 
    )
}

export default Login
