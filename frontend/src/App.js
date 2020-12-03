import React, { useReducer } from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetails from './pages/ProductDetails';
import ProductCart from './pages/ProductCart';
import Shipping from './pages/Shipping';
import PlaceOrder from './pages/PlaceOrder';
import CheckOut from './pages/CheckOut';
import Navbar from './components/Navbar';
import CreateProduct from './pages/CreateProduct';
import ProductList from './pages/ProductList';
import OrderList from './pages/OrderList';
import EditProduct from './pages/EditProduct';
import cartItemsReducer from './reducers/cartItemsReducer';
import { cartItemsContext } from './context/cartItemsContext';
import Cookies from "js-cookie";

function App() {
  const cartItems = Cookies.getJSON("cartItems");

  let initialState = [];

  if(cartItems) {
    initialState = [...cartItems];
  }

  const [state, dispatch] = useReducer(cartItemsReducer, initialState);

  return (
    <>
    <BrowserRouter>
      <cartItemsContext.Provider value={{ cartItems: state, cartItemsDispatch: dispatch }}>
        <Navbar/>
        
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/products/create" component={CreateProduct} />
          <Route exact path="/products/edit/:productId" component={EditProduct} />
          <Route exact path="/products/productlist" component={ProductList} />
          <Route exact path="/products/:productId" component={ProductDetails} />
          <Route exact path="/cart" component={ProductCart} />
          <Route exact path="/shipping" component={Shipping} />
          <Route exact path="/placeorder" component={PlaceOrder} />
          <Route exact path="/checkout/orderlist" component={OrderList} />
          <Route exact path="/checkout/:checkoutId" component={CheckOut} />
        </Switch>
      </cartItemsContext.Provider>
    </BrowserRouter>
    </>
  );
}

export default App;
