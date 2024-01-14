import React from 'react';
import {getUserId, getUserName} from "../reducks/users/selectors"
import { useDispatch, useSelector } from 'react-redux';
import { signOutAction } from '../reducks/users/actions';

const Home = () => {
    const dispatch = useDispatch()
    const selector = useSelector (state => state);
    const uid = getUserId(selector);
    const username = getUserName(selector);

    return(
        <div>
            <h2>Home</h2>
            <p>user id : {uid}</p>
            <p>user name : {username}</p>
            <button onClick={() => dispatch(signOutAction())}>SIGN OUT</button>


        </div>
    )
}

export default Home;