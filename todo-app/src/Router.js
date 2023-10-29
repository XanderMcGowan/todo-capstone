import React from 'react'
import { Routes, Route } from 'react-router'
import Login from './components/Login';


const Router = () => {
    return (
        <Routes>
            <Route exact path="/" component={Login} />
        </Routes>
    );
};

export default Router;