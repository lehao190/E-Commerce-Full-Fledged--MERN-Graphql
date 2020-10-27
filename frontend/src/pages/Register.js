import React from 'react';
import { Link } from "react-router-dom";

function Register() {
    return (
        <div className="wrapper">
            <div className="container">
                <form className="login-form">
                    <small>ĐĂNG KÝ</small>

                    <div className="form-control">
                        <label htmlFor="username">Tên Đăng Nhập</label>
                        <input name="username" required type="username" id="username" placeholder="Điền Vào Tên Đăng Nhập" />
                    </div>

                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input name="email" required type="email" id="email" placeholder="Điền Vào Email" />
                    </div>

                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input name="password" required type="password" id="password" placeholder="Điền Vào Mật Khẩu" />
                    </div>

                    <div className="form-control">
                        <label htmlFor="repassword">Re-Password</label>
                        <input type="password" required id="repassword" placeholder="Điền Lại Mật Khẩu" />
                    </div>

                    <button className="btn">Đăng Ký</button>

                    <small>Đã có tài khoản? <Link className="google-redirect" to="/login">Đăng Nhập</Link></small>
                </form>
            </div>
        </div>
    )
}

export default Register
