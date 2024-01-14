import { signInAction, signOutAction } from "./actions";
import { push } from 'connected-react-router';
import {db, auth, FirebaseTimestamp, createUserWithEmailAndPassword} from '../../firebase/index';
import {isValidEmailFormat, isValidRequiredInput} from "../../function/common";
import { Timestamp } from "firebase/firestore";
import { getFirestore, collection, query, getDocs, getDoc, doc, deleteDoc, setDoc, writeBatch } from 'firebase/firestore';
import {hideLoadingAction, showLoadingAction} from "../loading/actions";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
// ... other imports

export const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged(async user => {
            try {
                if (!user) {
                    // throw new Error('ユーザーIDを取得できません');
                    dispatch(push('/signin'));
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
        })
    }    
};


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

export const signOut = () => {
    return async (dispatch, getState) => {
        dispatch(showLoadingAction("Sign out..."));
        const uid = getState().users.uid;
        const db = getFirestore();

        // Attempt to delete products from the user's cart
        try {
            const cartRef = collection(db, 'users', uid, 'cart');
            const cartQuerySnapshot = await getDocs(cartRef);

            // Create a batch to delete all documents at once
            const batch = writeBatch(db);
            cartQuerySnapshot.docs.forEach((docSnapshot) => {
                batch.delete(docSnapshot.ref);
            });
            await batch.commit();

            // Proceed with sign out
            await auth.signOut();
            dispatch(signOutAction());
            // dispatch(initProductsAction());
            dispatch(push('/signin'));
        } catch (error) {
            console.error('Sign out failed: ', error);
            alert('ログアウトに失敗しました。');
        } finally {
            dispatch(hideLoadingAction());
        }
    };
};

export const resetPassword = (email) => {
    return async (dispatch) => {
        if (!isValidEmailFormat(email)) {
            alert('Invalid email')
            return false
        } else {
            return auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert('Email sent to the input email address')
                    dispatch(push('/signin'))
                }).catch(() => {
                    alert('The email addres is not registered. Please check again.')
                })
        }
    }
}