import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { UploaderRes } from "../../pages/Atlas/Prev/Prev";
import Alert from "@mui/material/Alert"
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function UploadDialog({ ballot }) {
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {Boolean(RenderButtton) && (
                <Button
                    sx={{ textTransform: "none" }}
                    onClick={handleClickOpen}
                >
                    Upload results
                </Button>
            )}
            <Dialog
                fullWidth
                open={open}
                maxWidth={"md"}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Upload results</DialogTitle>
                <DialogContent dividers >
                    {!Boolean(ballot?.candidates?.length) && (
                        <>
                            <Box sx={{ my: 2 }} >
                                <Alert severity="error" >
                                    Add Candiates to this vote to add results
                                </Alert>
                            </Box>
                        </>
                    )}
                    {Boolean(ballot?.candidates?.length) && (
                        <>
                            <UploaderRes ballot={ballot} />
                        </>
                    )}

                </DialogContent>
                <DialogActions>
                    <Button handleClose={handleClose} />
                    <Button handleClose={handleClose} />
                </DialogActions>
            </Dialog>
        </div>
    );
}
