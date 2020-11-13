import React from 'react';
import { Link } from 'react-router-dom';
import UserReviews from '../components/UserReviews';
import { useQuery } from "@apollo/client";
import { PRODUCT } from "../graphql/Queries/productQueries";

function ProductDetails(props) {
    const { loading, error, data } = useQuery(PRODUCT, {
        variables: {
            id: props.match.params.productId
        }
    });

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

    if(loading) return <div>Đang lấy dữ liệu...</div>

    if(error) return <div>Đã xảy ra lỗi trong quá trình lấy dữ liệu !!!</div>

    if(data){
        const {
            product: {
                name, 
                description, 
                image, 
                price, 
                countInStock
            }
        } = data;

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
                            <img src={`http://localhost:4000/public/images/${image}`} alt=""/>
                        </div>
                    </div>
    
                    <div className="product-overview">
                        <div className="product-name">
                            <h1>
                               {name}
                            </h1>
                        </div>
    
                        <div className="ratings">
                            <div className="product-ratings">
                                <div className="stars" 
                                    style={style}>
                                    ★★★★★
                                </div>
                                <div className="product-reviews">
                                    2 đánh giá
                                </div>
                            </div>
                        </div>
    
                        <div className="price">
                            Price: ${price}
                        </div>
    
                        <div className="description">
                            {description}
                        </div>
                    </div>
    
                    <div className="add-product">
                        <table>
                            <thead>
                                <tr>
                                    <td><h1>Giá: </h1> <h1>${price}</h1> </td>
                                </tr>
                            </thead>
    
                            <tbody>
                                <tr>
                                    <td>
                                        <h1>Tình trạng: </h1>
                                        <h1>Vẫn còn {countInStock} </h1>
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
                                        <button>
                                            <Link to="/cart" style={{
                                                color: "white",
                                                width: "100%",
                                                display: "block"
                                                }}>
                                                THÊM VÀO GIỎ
                                            </Link>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
}

export default ProductDetails
