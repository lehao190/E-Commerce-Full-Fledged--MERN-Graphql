import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/Mutations/userMutations";
import { ME } from "../graphql/Queries/userQueries";
import Cookies from "js-cookie";
// import { userHook } from "../hooks/userHook";

function Login(props) {
    const [login] = useMutation(LOGIN);

    const [errors, setErrors] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await login({
                variables: {
                    email,
                    password
                },
                update: (cache, { data: { login } }) => {
                    // cache.writeQuery({
                    //     query: ME
                    // }, login);

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
                <form className="login-form" onSubmit={onSubmit}>
                    <small>ĐĂNG NHẬP</small>

                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input type="email" onChange={ e => setEmail(e.target.value) } name="email" id="email" placeholder="Nhập vào email" />
                    </div>

                    <div style={{color: "red"}}>
                        {errors && errors.email}
                    </div>

                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input type="password" onChange={ e => setPassword(e.target.value) } name="password" id="password" placeholder="Nhập vào password" />
                    </div>

                    <div style={{color: "red"}}>
                        {errors && errors.password}
                    </div>

                    <button className="btn">Đăng Nhập</button>

                    <small>Chưa Có Tài Khoản? <Link className="google-redirect" to="/register">Đăng Ký</Link></small> 
                </form>
            </div>
        </div> 
    )
}

export default Login
