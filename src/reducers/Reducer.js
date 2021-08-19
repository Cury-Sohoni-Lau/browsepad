const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_JWT_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "UNSET_USER_AND_TOKEN":
      return {
        ...state,
        token: "",
        user: {},
      };
    default:
      return state;
  }
};

export default Reducer;
