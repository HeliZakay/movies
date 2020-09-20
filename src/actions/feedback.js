import database from "../firebase/firebase";

  
  export const startAddFeedback = (content) => {
     return (dispatch, getState) => {
        const uid=getState().auth.uid;
        const username = getState().auth.username;
      database.ref("feedback").push({content, uid, username});
     }
  };
  
   