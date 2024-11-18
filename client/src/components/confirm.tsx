import { Button, Dialog, DialogActions, DialogContentText, DialogTitle, DialogContent } from "@mui/material";
import { useConfirm } from "../hooks/use-alert-utils";

export function Confirm() {
    const { confirmClose, confirmOpen, confirmProps } = useConfirm();

    const handleConfirm = () => {
        confirmProps?.handleConfirm();
        confirmClose();
    };

    return (
        <Dialog
            open={confirmOpen}
            onClose={confirmClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
                sx: {
                    minWidth: "20rem",
                },
            }}
        >
            <DialogTitle id="alert-dialog-title">{confirmProps?.title || "Are you sure?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {confirmProps?.children ? confirmProps.children : confirmProps?.description || "Are you sure?"}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={confirmClose} color="error" variant="contained">
                    {confirmProps?.cancelButtonText || "Cancelar"}
                </Button>
                <Button onClick={handleConfirm} autoFocus variant="contained">
                    {confirmProps?.confirmButtonText || "Confirmar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
