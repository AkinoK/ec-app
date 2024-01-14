import React from 'react';
import {Route, Switch} from 'react-router';
import {SignIn, Home, SignUp, Reset, ProductEdit} from './templates';
import Auth from "./Auth";

const Router = () => {
    return (
        // method Switch & exact 部分一致ではなく完全一致
         // /がなくてもホームを表示
        <Switch>
            <Route exact path ={"/signup" } component = {SignUp} />
            <Route exact path ={"/signin" } component = {SignIn} />
            <Route exact path ={"/signin/reset" } component = {Reset} />

            <Auth>
            <Route exact path ={"/(/)?"}  component = {Home} />
            <Route exact path ={"/product/edit"}  component = {ProductEdit} />

            </Auth>
           
        </Switch>
    );
};

export default Router;