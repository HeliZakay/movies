export const countUnreadNotifications = (notifications) => {
    let count = 0;
    notifications.forEach((notification) => {
      if (notification.read === false) {
        count += 1;
      }
    });
    return count;
  }

  export const sortByDate = (notifications) => {
    return notifications.sort((a, b) => {
        return a.createdAt < b.createdAt ? 1 : -1;
  });
}