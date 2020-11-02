import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../graphql/Mutations/userMutations";
import { ME } from "../graphql/Queries/userQueries";
import Cookies from "js-cookie";

// Register Page
function Register(props) {
    const [register] = useMutation(REGISTER);

    const [errors, setErrors] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await register({
                variables: {
                    username,
                    email,
                    password,
                    confirmPassword
                },
                update: (cache, { data: { register } }) => {
                    setErrors("");

                    Cookies.set("isLoggedIn", { state: true });
                    
                    props.history.push({
                        pathname: "/"
                    });
                },
                refetchQueries: [{
                    query: ME
                }]
            });
        } catch (error) {
            setErrors(error.graphQLErrors[0].extensions.errors);
            return null;
        }
    }

    return (
        <div className="wrapper">
            <div className="container">
                <form onSubmit={onSubmit} className="login-form">
                    <small>ĐĂNG KÝ</small>

                    <div style={{color: "red"}}>
                        {errors && errors.user}
                    </div>

                    <div className="form-control">
                        <label htmlFor="username">Tên Đăng Nhập</label>
                        <input onChange={ e => setUsername(e.target.value) } name="username" required type="username" id="username" placeholder="Điền Vào Tên Đăng Nhập" />
                    </div>

                    <div style={{color: "red"}}>
                        {errors && errors.username}
                    </div>

                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input onChange={ e => setEmail(e.target.value) } name="email" required type="email" id="email" placeholder="Điền Vào Email" />
                    </div>

                    <div style={{color: "red"}}>
                        {errors && errors.email}
                    </div>

                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input onChange={ e => setPassword(e.target.value) } name="password" required type="password" id="password" placeholder="Điền Vào Mật Khẩu" />
                    </div>

                    <div style={{color: "red"}}>
                        {errors && errors.password}
                    </div>

                    <div className="form-control">
                        <label htmlFor="repassword">Re-Password</label>
                        <input onChange={ e => setConfirmPassword(e.target.value) } type="password" required id="repassword" placeholder="Điền Lại Mật Khẩu" />
                    </div>

                    <div style={{color: "red"}}>
                        {errors && errors.confirmPassword}
                    </div>

                    <button className="btn">Đăng Ký</button>

                    <small>Đã có tài khoản? <Link className="google-redirect" to="/login">Đăng Nhập</Link></small>
                </form>
            </div>
        </div>
    )
}

export default Register
