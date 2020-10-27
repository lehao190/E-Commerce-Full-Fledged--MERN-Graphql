import React from 'react';
import { Link } from 'react-router-dom';
import UserReviews from '../components/UserReviews';

function ProductDetails() {
    const percent = 50;

    const style = {
        width: "50%",
        fontSize: "1.4rem",
        letterSpacing: "2px",
        background: `linear-gradient(90deg, yellow ${percent}%, gray 0%)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
    };

    return (
        <div id="product-details-container">
            <div className="home-redirect">
                <div>
                    <Link to="/"><span>TRỞ VỀ</span></Link>
                </div>
            </div>

            <div className="product-info">
                <div className="product-image">
                    <div>
                        <img src="/logo192.png" />
                    </div>
                </div>

                <div className="product-overview">
                    <div className="product-name">
                        <h1>
                            This is my awesome headphone!!
                            his is my awesome headphone!!
                            his is my awesome headphone!!
                            his is my awesome headphone!!
                        </h1>
                    </div>

                    <div className="ratings">
                        <div className="product-ratings">
                            <div className="stars" 
                            style={style}>
                                ★★★★★
                            </div>
                        </div>
                    </div>

                    <div className="price">
                        Price: $40
                    </div>

                    <div className="description">
                        lorem hahah2 a112as1d
                        lorem hahah2 a112as1d
                        lorem hahah2 a112as1d
                        lorem hahah2 a112as1d
                        lorem hahah2 a112as1d
                        lorem hahah2 a112as1d
                        lorem hahah2 a112as1d
                        lorem hahah2 a112as1d
                        lorem hahah2 a112as1d
                    </div>
                </div>

                <div className="add-product">
                    <form action="/">
                        <table>
                            <thead>
                                <tr>
                                    <td><h1>Giá: </h1> <h1>$40</h1> </td>
                                </tr>
                            </thead>

                           <tbody>
                                <tr>
                                    <td>
                                        <h1>Tình trạng: </h1>
                                        <h1>Vẫn còn</h1>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <h1>Số lượng: </h1>
                                        <input type="number" min="0"/>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <button>THÊM VÀO GIỎ</button>
                                    </td>
                                </tr>
                           </tbody>
                        </table>
                    </form>
                </div>
            </div>

            <div className="reviews">
                <h1>ĐÁNH GIÁ CỦA NGƯỜI DÙNG</h1>
            </div>

            <div className="user-reviews">        
                <UserReviews/>
                <UserReviews/>
                <UserReviews/>

                <div className="my-review">
                    <div>
                        <h1>ĐÁNH GIÁ CỦA BẠN</h1>
                    </div>

                   <form action="/">
                        <div>
                            <h1>Chất lượng:</h1>

                            <div>
                                <select>
                                    <option>Xuất Sắc - 5 sao</option>
                                    <option>Tuyệt Vời - 4 sao</option>
                                    <option>Tốt - 3 sao</option>
                                    <option>Bình Thường - 2 sao</option>
                                    <option>Kém - 1 sao</option>
                                </select>
                            </div>

                            <h1>
                                Bình Luận:
                            </h1>

                            <div>
                                <textarea/>
                            </div>
                        </div>

                        <div>
                            <button>ĐĂNG</button>
                        </div>
                   </form>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
