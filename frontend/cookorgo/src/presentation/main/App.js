import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from "../home/Home";
import Dashboard from "../dashboard/Dashboard";
import Restaurants from "../restaurant/Restaurants";
import HomeCook from "../housecooking/HomeCook";
import ProductPage from '../product/ProductPage';
import SummaryPage from '../summary/SummaryPage';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path={"/"} element={<Home/>}/>
                    <Route exact path={"/dashboard"} element={<Dashboard/>}/>
                    <Route exact path={"/restaurants"} element={<Restaurants/>}/>
                    <Route exact path={"/homeCook"} element={<HomeCook/>}/>
                    <Route exact path={"/summary"} element={<SummaryPage />} />
                    <Route path="/products/:categoryId/:productId" element={<ProductPage/>}/>
                </Routes>
            </Router>
        );
    }
}