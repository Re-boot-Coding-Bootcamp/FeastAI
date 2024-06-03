import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { signOut } from "next-auth/react";
import React from "react";

interface SignOutDialogProps {
  open: boolean;
  handleClose: () => void;
}

const SignOutDialog = ({ open, handleClose }: SignOutDialogProps) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="sign-out-dialog-title">
        Are you sure you want to sign out?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={async () => {
            await signOut();
            handleClose();
          }}
          color="error"
          autoFocus
        >
          Sign Out
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SignOutDialog;
