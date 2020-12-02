import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserReviews from '../components/UserReviews';
import { useQuery, useMutation } from "@apollo/client";
import { PRODUCT } from "../graphql/Queries/productQueries";
import { ME } from "../graphql/Queries/userQueries";
import { cartItemsContext } from '../context/cartItemsContext';
import { ADD_ITEM } from '../actions/cartItemsActions';
import { CREATE_PRODUCT_COMMENT } from "../graphql/Mutations/productMutations";

function ProductDetails(props) {
    // Cart Items Context
    const cartContext = useContext(cartItemsContext);

    const [errors, setErrors] = useState("");
    // Quantity of the item
    const [count, setCount] = useState(0);

    // Rating of user
    const [rating, setRating] = useState(5);

    // Comment of user
    const [comment, setComment] = useState("");

    // Fetch Product's data
    const { loading, error, data } = useQuery(PRODUCT, {
        variables: {
            id: props.match.params.productId
        }
    });

    // Fetch for user 
    const { data: user } = useQuery(ME, {
        fetchPolicy: "cache-and-network"
    });

    const [createComment] = useMutation(CREATE_PRODUCT_COMMENT);

    const percent = data && (data.product.rating/5) * 100;
    
    const style = {
        width: "50%",
        fontSize: "1.4rem",
        letterSpacing: "2px",
        background: `linear-gradient(90deg, yellow ${percent}%, gray 0%)`,
        // backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
    };

    // Add item to cart
    const onClick = () => {
        cartContext.cartItemsDispatch({
            type: ADD_ITEM,
            payload: {
                brand: data.product.brand,
                category: data.product.category,
                countInStock: count,
                description: data.product.description,
                id: data.product.id,
                image: data.product.image,
                name: data.product.name,
                price: data.product.price,
            }
        });
    };

    // Add User Commet
    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            if(user)
                await createComment({ 
                    variables: { 
                        productId: props.match.params.productId, 
                        userId: user.me.id,
                        username: user.me.username,
                        userRating: Number(rating), 
                        userComment: comment
                    },
                    update: () => {
                        setErrors(""); 
                    },
                });
        } catch (error) {
            setErrors(error.graphQLErrors[0].extensions.errors);
            
            return null;
        }
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
                countInStock,
                numReviews,
                users
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
                                    { numReviews } đánh giá
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
                                        <input type="number" min={0} max={countInStock} onChange={ e => setCount(e.target.value) }/>
                                    </td>
                                </tr>
    
                                <tr>
                                    <td>
                                        {
                                            countInStock > 0 &&
                                                <button>
                                                    <Link onClick={onClick} to="/cart" style={{
                                                        color: "white",
                                                        width: "100%",
                                                        display: "block"
                                                        }}>
                                                        THÊM VÀO GIỎ
                                                    </Link>
                                                </button>
                                        }

                                        {
                                            countInStock <= 0 &&
                                                <button style={{
                                                            backgroundColor: "black",
                                                            cursor: "not-allowed"
                                                        }}>
                                                    HẾT HÀNG
                                                </button>
                                        }
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
                    {
                        users.map(userComment => {
                            return <UserReviews key={userComment._id} userComment={userComment} />
                        })
                    }

                    <div className="my-review">
                        <div>
                            <h1>ĐÁNH GIÁ CỦA BẠN</h1>
                        </div>
    
                       {
                           user &&
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h1>Chất lượng:</h1>
        
                                    <div>
                                        <select name="ratings" onChange={ e => setRating(e.target.value) }>
                                            <option value={5}>Xuất Sắc - 5 sao</option>
                                            <option value={4}>Tuyệt Vời - 4 sao</option>
                                            <option value={3}>Tốt - 3 sao</option>
                                            <option value={2}>Bình Thường - 2 sao</option>
                                            <option value={1}>Kém - 1 sao</option>
                                        </select>
                                    </div>
        
                                    <h1>
                                        Bình Luận:
                                    </h1>
        
                                    <div>
                                        <textarea onChange={ e => setComment(e.target.value) } />
                                    </div>
                                </div>
        
                                <div>
                                    <button>ĐĂNG</button>
                                </div>

                                {
                                    errors &&
                                        <div style={{
                                            marginTop: "20px",
                                            fontSize: "1.2rem"
                                            }}
                                            className="checkout-state warning">
                                                Xảy ra lỗi khi đăng !!!
                                        </div>
                                }
                            </form>
                       }

                       {
                           !user &&
                            <div style={{
                                marginTop: "20px",
                                fontSize: "1.2rem"
                                }}
                                className="checkout-state warning">
                                    Bạn Chưa Đăng Nhập !!!
                            </div>
                       }
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetails