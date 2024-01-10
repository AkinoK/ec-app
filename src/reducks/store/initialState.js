//sotreの初期状態
//アプリに必要なstateを全て記述
//exportしておく

const initialState =  {
    products:{

    },
    users:{
        isSignedIn: false,
        role:"",
        uid: "",
        username: "",
    }
};

export default initialState