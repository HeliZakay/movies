import {firebase, googleAuthProvider} from "../firebase/firebase";
import database from "../firebase/firebase";


export const login = (uid) => ({
    type: "LOGIN",
    uid
});


export const doesHaveUsername = (doesHaveUsername) => ({
    type: "DOES_HAVE_USERNAME",
    doesHaveUsername
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
        database.ref(`users/${uid}`).update({email: `${userEmail}`})  
        }
        dispatch(login(uid));
      }); 
    };
  };


  export const addUsername = (username) => ({
    type: "ADD_USERNAME",
    username
  });


  export const startAddUsername = (username) => {
    const usernameParam = username;
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}`).update({username: usernameParam}).then( () => {
            dispatch(addUsername(usernameParam));
        });
    };
  };

  
  export const addLanguage = (language) => ({
    type: "ADD_LANGUAGE",
    language
  });


  export const startAddLanguage = (language) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}`).update({language: language}).then( () => {
            dispatch(addLanguage(language));
        });
    };
  };

export const setUserDetails = ({username, email, uid, language}) => ({
    type: "SET_USER_DETAILS",
    username,
    uid,
    email,
    language
});

export const startSetUserDetails = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}`).once("value").then((snapshot) => {
            const username = snapshot.val().username;
            const uid = snapshot.key;
            const email = snapshot.val().email;
            const language = snapshot.val().language? snapshot.val().language: "" ;
            dispatch(setUserDetails({username, uid, email, language}));
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

export const startEmailLogin = ({email, password, setError}) => {
    return () => {
        setError("");
        firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
            if (String(error.code) === "auth/email-already-in-use") {
                firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
                            setError(error.message);        
                });
            } else {
                setError(error.message);
            }
        });
}
}

