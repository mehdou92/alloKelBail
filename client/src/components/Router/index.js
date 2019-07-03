import React from "react";
import { Route, Redirect } from "react-router-dom";
import SignIn from "../SignIn";
import Register from '../Register';
import sucessRegistered from '../SucessRegistered';

const Router = () => (
    <>
        {/* <Route path="/" exact component={Home} /> */}
        <Route path="/login" exact component={SignIn} />
        <Route path="/profile" exact component={SignIn} />
        <Route path="/logout" render={() => (
            <Redirect to="/" />
        )} />
        <Route path="/register" exact component={Register} />
        <Route path="/sucessRegistered" exact component={sucessRegistered} />
    </>
);

export default Router;