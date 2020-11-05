import React from 'react';

function Shipping() {
    return (
        <div className="wrapper">
            <div className="container">
                <form className="login-form">
                    <small>GIAO HÀNG</small>

                    <div className="form-control">
                        <label htmlFor="address">Địa Chỉ</label>
                        <input type="address" name="address" id="address" placeholder="Nhập vào địa chỉ" />
                    </div>

                    <div className="form-control">
                        <label htmlFor="city">Thành Phố</label>
                        <input type="city" name="city" id="city" placeholder="Nhập vào thành phố" />
                    </div>

                    <div className="form-control">
                        <label htmlFor="postal">Mã Postal</label>
                        <input type="postal" name="postal" id="postal" placeholder="Nhập mã" />
                    </div>

                    <div className="form-control">
                        <label htmlFor="country">Quốc Gia</label>
                        <input type="country" name="country" id="country" placeholder="Nhập quốc gia" />
                    </div>

                    <button className="btn">TIẾP TỤC</button>
                </form>
            </div>
        </div> 
    )
}

export default Shipping
