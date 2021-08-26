import React, { createContext, useReducer } from "react";
import Reducer from "./reducers/Reducer";

const initialState = {
  user: {},
  token: "",
  notes: [],
  filteredNotes: [],
  sharedNotes: [],
  selectedNote: {},
  showEditForm: false,
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);

export default Store;
