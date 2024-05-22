import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface ConfirmSubmissionDialogProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: () => Promise<void>;
}

const ConfirmSubmissionDialog = ({
  open,
  handleClose,
  onSubmit,
}: ConfirmSubmissionDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="confirm-submission-dialog-title"
      aria-describedby="confirm-submission-dialog-description"
    >
      <DialogTitle id="confirm-submission-dialog-title">
        Ready to submit?
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <DialogContentText id="confirm-submission-dialog-description">
          {`Once you submit, we will start working on your meal plan, and you won't be able to make changes.`}
        </DialogContentText>
        <DialogContentText id="confirm-submission-dialog-description-2">
          {`If you're signed in, you can wait for your meal plan or check back later to view it on the dashboard.`}
        </DialogContentText>
        <DialogContentText id="confirm-submission-dialog-description-2">
          {`If you're not signed in, hang tight and make sure not to refresh!`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={async () => {
            await onSubmit();
            handleClose();
          }}
          color="primary"
          autoFocus
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { ConfirmSubmissionDialog };
