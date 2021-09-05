const Reducer = (state, action) => {
  switch (action.type) {
    case "REFRESH":
      return {
        ...state,
        refresh: state.refresh + 1,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_USER_PROFILE_PIC":
      return {
        ...state,
        user: {
          ...state.user,
          image: action.payload,
        },
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
        user: null,
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
    case "SET_NOTES":
      return {
        ...state,
        notes: action.payload,
        filteredNotes: action.payload,
      };
    case "SET_FILTERED_NOTES":
      return {
        ...state,
        filteredNotes: action.payload,
      };
    case "SET_MY_NOTES":
      return {
        ...state,
        myNotes: action.payload,
      };
    case "SET_SHARED_NOTES":
      return {
        ...state,
        sharedNotes: action.payload,
      };
    case "SET_SHOWING_SHARED_NOTES":
      return {
        ...state,
        showingSharedNotes: action.payload,
      };
    case "SET_SHOWING_SIDEBAR":
      return {
        ...state,
        showingSidebar: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
