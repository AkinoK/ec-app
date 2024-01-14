export const SIGN_IN = "SIGN_IN";
export const signInAction = (userState) => {
    return {
        type: "SIGN_IN",
        payload:{
            isSignedIn: true,
            role: userState.role,
            uid: userState.uid,
            username: userState.username
        }
    }
}

export const SIGN_OUT = "SIGN_OUT";
// 引数は受け取らない。初期の状態に戻すだけだから
export const signOutAction = () => {
    return {
        type: "SIGN_OUT",
        payload:{
            isSignedIn: false,
            uid: "",
            username: ""
        } 
    }
}