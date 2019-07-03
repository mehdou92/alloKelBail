import React from "react";
import { Route, Redirect } from "react-router-dom";
import SignIn from "../SignIn";
import Register from '../Register';

const Router = () => (
    <>
        {/* <Route path="/" exact component={Home} /> */}
        <Route path="/login" exact component={SignIn} />
        <Route path="/profile" exact component={SignIn} />
        <Route path="/logout" render={() => (
            <Redirect to="/" />
        )} />
        <Route path="/register" exact component={Register} />
    </>
);

export default Router;