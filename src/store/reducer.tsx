import { nanoid } from "nanoid";
import { ADD_TOAST_MSG, END_LOADING, LG_ACTIVE, MOBILE_EXPAND, REMOVE_TOAST_MSG, START_LOADING } from "./actionType";



export default function reducer(state, action) {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        apiCallsInProgress: state.apiCallsInProgress + 1,
      };
    case END_LOADING:
      return {
        ...state,
        apiCallsInProgress: state.apiCallsInProgress - 1,
      };
    case MOBILE_EXPAND:
      return {
        ...state,
        asideMobileExpanded: action.payload.value
      };
    case LG_ACTIVE:
      return {
        ...state,
        asideLgActive: action.payload.value
      };
    case ADD_TOAST_MSG:
      return {
        ...state,
        toastMsgs: [...state.toastMsgs, { ...action.payload, id: nanoid() }]
      };
    case REMOVE_TOAST_MSG:{
      const newToastMsgs = state.toastMsgs.filter(
        (msg) => msg.id !== action.payload.id
      );
      return {
        ...state,
        toastMsgs: newToastMsgs ? [...newToastMsgs] : [],
      };
      }
    default: {
      return state;
    }
  }
}
