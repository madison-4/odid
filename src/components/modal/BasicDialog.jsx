import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton"
import Slide from "@mui/material/Slide";
import SearchIcon from "@mui/icons-material/Search";
import { ResultsDialog } from "../Votes/forms/Modals/ResultsModal";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BasicDialog({
  children,
  RenderButtton,
  bigger,
  CloseAction,
  SubmitAction,
  title,
  SignupAction,
  open,
  setOpen,
  medium,
}) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {Boolean(RenderButtton) && (
        <RenderButtton
          sx={{ textTransform: "none" }}
          onClick={handleClickOpen}
        />
      )}
      <Dialog
        fullWidth
        open={open}
        maxWidth={bigger ? "lg" : medium ? "md" : "sm"}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {title}
          <IconButton
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <ResultsDialog />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
        <DialogActions>
          {Boolean(SignupAction) && <SignupAction handleClose={handleClose} />}
          <CloseAction handleClose={handleClose} />
          <SubmitAction handleClose={handleClose} />
        </DialogActions>
      </Dialog>
    </div>
  );
}
