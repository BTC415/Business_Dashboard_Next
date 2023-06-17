import { useContext, useReducer } from "react";
import {
  ADD_TOAST_MSG,
  END_LOADING,
  START_LOADING,
} from "../store/actionType";
import Store from "../store/store";
import reducer from "../store/reducer";

export const useCustomHook = () => {
  const { state, dispatch } = useContext(Store);
  const startLoading = () => {
    dispatch({ type: START_LOADING });
  };
  const endLoading = () => {
    dispatch({ type: END_LOADING });
  };
  const addToastMsg = (msg, type) => {
    dispatch({ type: ADD_TOAST_MSG, payload: { msg, type } });
  };

  return {
    state,
    dispatch,
    startLoading,
    endLoading,
    addToastMsg,
  };
};
