import React, {useState, useCallback} from 'react';
import {PrimaryButton, TextInput} from "../components/UIkit";
import {useDispatch} from "react-redux";
import {resetPassword} from "../reducks/users/operations";
import {push} from "connected-react-router"

const Reset = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("")

    const inputEmail = useCallback((e) => {
        setEmail(e.target.value)
    },[]);

    return (
        <div className="c-section-container">
            <h2 className="u-text-center u-text__headline">Reset Password</h2>
            <div className="module-spacer--medium" />
            <TextInput
                fullWidth={true} label={"email"} multiline={false} required={true}
                rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton label={"Reset password"} onClick={() => dispatch(resetPassword(email))} />
                <div className="module-spacer--small" />
                <p className="u-text-small"onClick={() => dispatch(push('/signin'))}>Go back to sign in page</p>
            </div>
        </div>
    );
};

export default Reset;