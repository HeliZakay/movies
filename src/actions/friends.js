import database from "../firebase/firebase";


export const addFriend = (userId, email, username) => ({
    type: 'ADD_FRIEND',
    userId,
    email,
    username
  });
  

  export const friendNotFound = () => ({
    type: "FRIEND_NOT_FOUND"
  });

  export const friendFound = () => ({
    type: "FRIEND_FOUND"
  });

  export const friendAlreadyExist = () => ({
      type: "FRIEND_ALREADY_EXIST"
  });

  export const startSearchFriendInDB = (email) => {
    return (dispatch, getState) => {

        return database.ref("users").once("value").then((users) => {
            let foundFriend = false;
            users.forEach((user) => {
                if(user.val().email === email) {
                    foundFriend = true;
                    const userIdList = [];
                    getState().friends.friends.forEach((friendObj) => {
                        userIdList.push(friendObj.userId);
                    })
                    if(userIdList.includes(user.key)){
                        dispatch(friendAlreadyExist());
                      
                    } else {
                        const uid = getState().auth.uid;
                        
                        return database.ref(`users/${uid}/friends/${user.key}`).update({email: email, username: user.val().username}).then(() => {
                            dispatch(addFriend(user.key, email, user.val().username));
                            dispatch(friendFound());
                            database.ref(`users/${user.key}/friends/${uid}`).update({email: getState().auth.email, username: getState().auth.username});                            
                    });
                    }  
                }
                
            });
            if (!foundFriend) {
                dispatch(friendNotFound());
            }
        });
    };
  };

  export const addMe = () => {
      return database.ref("users").once("value").then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          let foundMe = false;
          for (const friend in childSnapshot.val().friends) {
            if (friend === "l87jNQ4OIAdINT37XKDDxCGrsNd2"){
              foundMe = true;
            }
        };
        if (!foundMe) {
          console.log("should add me to "+ childSnapshot.val().username);
          database.ref(`users/${childSnapshot.key}/friends/l87jNQ4OIAdINT37XKDDxCGrsNd2`).update({
            email: "helizakay1@gmail.com",
            username: "Heli"
          });
        }
      });
    });
  };

export const addFriendsToDB = () =>{
  return database.ref("users").once("value").then((snapshot) =>{
    snapshot.forEach((childSnapshot) => {
      const myGroup = childSnapshot.val().group;
      snapshot.forEach((internalChildSnapshot) => {
        if(myGroup && myGroup === internalChildSnapshot.val().group) {
          // console.log("my group is "+ myGroup+" equals to "+ internalChildSnapshot.val().group);
          
          if(childSnapshot.key !== internalChildSnapshot.key){
            let alreadyHave = false;
            for (const friend in childSnapshot.val().friends) {
              if (friend === internalChildSnapshot.key) {
                alreadyHave = true;

              };
            }
              if (!alreadyHave) {
                console.log("need to add "+  internalChildSnapshot.val().username  +" to " + childSnapshot.val().username );
                // database.ref(`users/${childSnapshot.key}/friends/${internalChildSnapshot.key}`)
                //   .update({email: internalChildSnapshot.val().email , username:internalChildSnapshot.val().username})
              }
              else{
                // console.log("already have him");
              }
            
            }
            else {
              // console.log("That's me");
            }
          }
          
        })
      })
    })
}


  export const setFriends = (friends) => ({
    type: "SET_FRIENDS",
    friends
  });


  export const startSetFriends = () => {
    return (dispatch, getState) => {
      const uid = getState().auth.uid;
      return database.ref(`users/${uid}/friends`).once("value").then( (snapshot) => {
        const friends = [];
        snapshot.forEach((friendSnapshot) => {
              friends.push({
                 userId: friendSnapshot.key,
                 email: friendSnapshot.val().email,
                 username: friendSnapshot.val().username
              });
        });
        
        dispatch(setFriends(friends));
      }); 
    };
  };

  