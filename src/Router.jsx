import React from 'react';
import {Route, Switch} from 'react-router';
import {Login, Home} from './templates';

const Router = () => {
    return (
        // method Switch & exact 部分一致ではなく完全一致
         // /がなくてもホームを表示
        <Switch>
            <Route exact path ={"/login" } component = {Login} />
            <Route exact path ={"/(/)?"}  component = {Home} />
           
        </Switch>
    );
};

export default Router;