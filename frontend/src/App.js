import React from 'react';
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

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/products/create" component={CreateProduct} />
        <Route exact path="/products/:productId" component={ProductDetails} />
        <Route exact path="/cart" component={ProductCart} />
        <Route exact path="/shipping" component={Shipping} />
        <Route exact path="/placeorder" component={PlaceOrder} />
        <Route exact path="/checkout" component={CheckOut} />
      </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
