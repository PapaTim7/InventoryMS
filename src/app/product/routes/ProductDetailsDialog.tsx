import { Dialog, DialogActions, Button, DialogContent } from "@mui/material";
import { ProductDetailsDialogPropsT } from "./Product.types";

export function ProductDetailsDialog({
  isDialogOpen,
  onClose,
  onActionClick,
}: ProductDetailsDialogPropsT) {
  return (
    <Dialog open={isDialogOpen} onClose={onClose}>
      <DialogContent>Product details</DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5 }}>
        <Button onClick={onClose} sx={{ mr: 1 }} variant="outlined">
          Cancel
        </Button>
        <Button onClick={onActionClick} variant="contained">
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
