export const getVisibleFriends =  (friends, name) => {
    return friends.filter((friend) => {
      const emailMatch = friend.email.toLowerCase().includes(name.toLowerCase());
      const usernameMatch = friend.username.toLowerCase().includes(name.toLowerCase());
      return emailMatch || usernameMatch;
    });   
  };


 export const getFriendsArray = (friends) => {
   return friends.map((friend) => {
    return friend.userId;
   })
 };
 export const getFriendById = (friends, friendId) => {
   const result = friends.filter((friend) => {
     return friend.userId === friendId;
   });
   if (result) {
     return result[0];
   } else {
     return undefined;
   }
 }