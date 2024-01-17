import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "../home/Home";
import Dashboard from "../dashboard/Dashboard";
export default class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path={"/"} element={<Home/>}/>
                    <Route exact path={"/dashboard"} element={<Dashboard/>}/>
                </Routes>
            </Router>
        );
    }
}