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