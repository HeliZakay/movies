
  export const sortByDate = (messages) => {
    return messages.sort((a, b) => {
          return a.createdAt < b.createdAt ? 1 : -1;
    });
  };

  export const countUnreadMessages = (recievedMessages) => {
    let count = 0;
    recievedMessages.forEach((message) => {
      if (message.read === false) {
        count += 1;
      }
    });
    return count;
  }