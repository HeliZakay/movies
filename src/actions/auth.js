import {firebase, googleAuthProvider} from "../firebase/firebase";
import database from "../firebase/firebase";

export const login = (uid) => ({
    type: "LOGIN",
    uid
});

export const startLogin = ({uid, email: userEmail}) => {
    return (dispatch) => {
      return database.ref("users").once("value").then( (snapshot) => {
        let firstTime = true;
        snapshot.forEach((user) => {
             if(user.key === uid) {
                 firstTime = false;
             }
        });
        if (firstTime) {
            database.ref(`users/${uid}`).update({email: `${userEmail}`}).then(() => {
                dispatch(login(uid));
            });
        }
        else {
            dispatch(login(uid));
        }
        
      }); 
    };
  };

export const showAuthPopup = () => {
    return() => {
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const logout = () => ({
    type: "LOGOUT"
});

export const startLogout = () => {
    return() => {
        return firebase.auth().signOut();
    };
};

