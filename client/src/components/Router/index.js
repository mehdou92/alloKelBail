import React from "react";
import { Route, Redirect } from "react-router-dom";
import SignIn from "../SignIn";
import Register from '../Register';
import SucessRegistered from '../SucessRegistered';
import Profile from '../Profile';
import MovieCard from '../MovieCard';
import ListMovies from '../ListMovies';

const Router = () => (
    <>
        {/* <Route path="/" exact component={ListMovie} /> */}
        <Route path="/" exact component={ListMovies} />
        <Route path="/login" exact component={SignIn} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/logout" render={() => (
            <Redirect to="/" />
        )} />
        <Route path="/register" exact component={Register} />
        <Route path="/sucessRegistered" exact component={SucessRegistered} />
        {/* <Route path="/movieCard/:id" exact component={MovieCard} /> */}
    </>
);

export default Router;