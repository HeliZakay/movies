  
export default (state = "", action) => {
    switch (action.type) {
      case 'SET_NAME_FILTER':
        return action.name;
      default:
        return state;
    }
  };
