import { signInAction } from "./actions";
import { push } from 'connected-react-router';
import {db, auth, FirebaseTimestamp, createUserWithEmailAndPassword} from '../../firebase/index';
import {isValidEmailFormat, isValidRequiredInput} from "../../function/common";
import { Timestamp } from "firebase/firestore";
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import {hideLoadingAction, showLoadingAction} from "../loading/actions";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// ... other imports


export const signIn = (email, password) => {
    return async (dispatch) => {
        dispatch(showLoadingAction("Sign in..."));
        if (!isValidRequiredInput(email, password)) {
            dispatch(hideLoadingAction());
            alert('メールアドレスかパスワードが未入力です。');
            return false;
        }
        if (!isValidEmailFormat(email)) {
            dispatch(hideLoadingAction());
            alert('メールアドレスの形式が不正です。');
            return false;
        }

        const auth = getAuth();
        const db = getFirestore();

        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const user = result.user;
            if (!user) {
                throw new Error('ユーザーIDを取得できません');
            }
            const userId = user.uid;

            const userDocRef = doc(db, "users", userId);
            const docSnap = await getDoc(userDocRef);

            if (!docSnap.exists()) {
                throw new Error('ユーザーデータが存在しません');
            }

            const data = docSnap.data();
            dispatch(signInAction({
                customer_id: data.customer_id ?? "",
                email: data.email,
                isSignedIn: true,
                role: data.role,
                payment_method_id: data.payment_method_id ?? "",
                uid: userId,
                username: data.username,
            }));

            dispatch(push('/'));
        } catch (error) {
            alert(error.message);
        } finally {
            dispatch(hideLoadingAction());
        }
    }
};

export const signUp = (username, email, password, confirmPassword) => {
    return async (dispatch) => {
        // Validation
        if(!isValidRequiredInput(email, password, confirmPassword)) {
            alert('Required area is missing');
            return false
        }

        if(!isValidEmailFormat(email)) {
            alert('Incorrect email format')
            return false
        }
        if (password !== confirmPassword) {
            alert("Password doesn't match")
            return false
        }
        if (password.length < 6) {
            alert('Password must be 6 letters or more')
            return false
        }

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;

            if (user) {
                const uid = user.uid;
                const timestamp = FirebaseTimestamp.now();

                const userInitialData = {
                    create_at: timestamp,
                    email: email,
                    role: "customer",
                    uid: uid,
                    updated_at: timestamp,
                    username: username
                };

                // New syntax for Firestore document set
                await setDoc(doc(db, "users", uid), userInitialData);
                
                dispatch(push('/'));
            }
        } catch (error) {
            // Handle errors here
            alert(error.message);
        }
    }
}