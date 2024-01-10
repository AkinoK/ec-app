import React from 'react';
import {Route, Switch} from 'react-router';
import {SignIn, Home, SignUp} from './templates';

const Router = () => {
    return (
        // method Switch & exact 部分一致ではなく完全一致
         // /がなくてもホームを表示
        <Switch>
            <Route exact path ={"/signup" } component = {SignUp} />
            <Route exact path ={"/SignIn" } component = {SignIn} />
            <Route exact path ={"/(/)?"}  component = {Home} />
           
        </Switch>
    );
};

export default Router;