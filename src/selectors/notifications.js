export const countUnreadNotifications = (notifications) => {
    let count = 0;
    notifications.forEach((notification) => {
      if (notification.read === false) {
        count += 1;
      }
    });
    return count;
  }