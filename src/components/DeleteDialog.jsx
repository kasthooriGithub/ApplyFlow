import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const DeleteDialog = ({ open, onClose, onConfirm }) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="delete-dialog-title"
    aria-describedby="delete-dialog-description"
    PaperProps={{
      sx: { borderRadius: 3, p: 1 }
    }}
  >
    <DialogTitle id="delete-dialog-title" sx={{ fontWeight: 700 }}>
      Delete Application
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="delete-dialog-description">
        Are you sure you want to delete this application? This action cannot be undone.
      </DialogContentText>
    </DialogContent>
    <DialogActions sx={{ px: 3, pb: 2 }}>
      <Button onClick={onClose} color="inherit">
        Cancel
      </Button>
      <Button 
        onClick={onConfirm} 
        variant="contained" 
        color="error" 
        disableElevation
        autoFocus
      >
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteDialog;

