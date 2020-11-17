import React, { useState } from 'react';
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/Queries/userQueries";
import Cookies from "js-cookie";

function Shipping(props) {
    const { loading, data } = useQuery(ME);

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postal, setPostal] = useState("");
    const [country, setCountry] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();

        Cookies.set("shipping", {
            address,
            city,
            postal,
            country
        });

        props.history.push({
            pathname: "/placeorder"
        });
    }

    if(loading) return <div>Đang Kiểm Tra ...</div>

    if(!data) props.history.push({
        pathname: "/login"
    });

    return (
        <div className="wrapper">
            <div className="container">
                <form onSubmit={onSubmit} className="login-form">
                    <small>GIAO HÀNG</small>

                    <div className="form-control">
                        <label htmlFor="address">Địa Chỉ</label>
                        <input onChange={ e => setAddress(e.target.value) } type="address" name="address" id="address" placeholder="Nhập vào địa chỉ" />
                    </div>

                    <div className="form-control">
                        <label htmlFor="city">Thành Phố</label>
                        <input onChange={ e => setCity(e.target.value) } type="city" name="city" id="city" placeholder="Nhập vào thành phố" />
                    </div>

                    <div className="form-control">
                        <label htmlFor="postal">Mã Postal</label>
                        <input onChange={ e => setPostal(e.target.value) } type="postal" name="postal" id="postal" placeholder="Nhập mã" />
                    </div>

                    <div className="form-control">
                        <label htmlFor="country">Quốc Gia</label>
                        <input onChange={ e => setCountry(e.target.value) } type="country" name="country" id="country" placeholder="Nhập quốc gia" />
                    </div>

                    <button className="btn">TIẾP TỤC</button>
                </form>
            </div>
        </div> 
    )
}

export default Shipping
