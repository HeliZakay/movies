
  export const sortByDate = (messages) => {
    return messages.sort((a, b) => {
          return a.createdAt < b.createdAt ? 1 : -1;
    });
  };