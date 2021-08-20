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
    case "SET_SELECTED_NOTE":
      return {
        ...state,
        selectedNote: action.payload,
      };
    case "TOGGLE_SHOW_EDIT_FORM":
      return {
        ...state,
        showEditForm: !state.showEditForm,
      };
    default:
      return state;
  }
};

export default Reducer;
