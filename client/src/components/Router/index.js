import React from "react";
import { Route } from "react-router-dom";
import SignIn from "../SignIn";
import Home from "../App"

const Router = () => (
    <>
        {/* <Route path="/" exact component={Home} /> */}
        <Route path="/login" exact component={SignIn} />
    </>
);

export default Router;