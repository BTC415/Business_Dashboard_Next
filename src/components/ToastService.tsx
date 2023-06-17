import { Alert, Snackbar, Stack } from "@mui/material";
import React, { useContext, useEffect, useReducer } from "react";
import { REMOVE_TOAST_MSG } from "../store/actionType";
import Store from "../store/store";
import reducer from "../store/reducer";

const ToastService = () => {
  const { state, dispatch } = useContext(Store);
  const handleClose = (_, reason, payload) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(payload);
  };

  return (
    <Stack spacing={8}>
      {state.toastMsgs.map(({ msg, id, type }) => {
        return (
          <Snackbar
            key={"snack" + id}
            open={true}
            className="cursor-pointer"
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={(e, r) => {
              handleClose(e, r, { type: REMOVE_TOAST_MSG, payload: { id } });
            }}
          >
            <Alert
              key={"alert" + id}
              onClose={(e, r) => {
                handleClose(e, r, { type: REMOVE_TOAST_MSG, payload: { id } });
              }}
              severity={type}
              sx={{ width: "100%" }}
            >
              {msg}
            </Alert>
          </Snackbar>
        );
      })}
    </Stack>
  );
};

export default ToastService;
