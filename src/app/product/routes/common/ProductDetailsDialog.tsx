import {
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Popover,
  Stack,
} from "@mui/material";
import { ProductDetailsDialogPropsT } from "../Product.types";
import { currencyFormatterUSD } from "@/utils";
import { QuantityLabel } from "./QuantityLabel";

import DeleteIcon from "@mui/icons-material/Delete";
import { useState, MouseEvent } from "react";

export function ProductDetailsDialog({
  productDetails,
  isDialogOpen,
  onClose,
  onDeleteClick,
  onActionClick,
}: ProductDetailsDialogPropsT) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClickDeleteBtn = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDeletePopover = () => {
    setAnchorEl(null);
  };

  const isDeletePopoverOpened = Boolean(anchorEl);

  const handleDeleteClick = () => {
    onDeleteClick();
    handleCloseDeletePopover();
    onClose();
  };

  return (
    <Dialog open={isDialogOpen} onClose={onClose}>
      <DialogContent>
        {productDetails && (
          <>
            <Typography
              variant="h5"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                marginBottom: 2,
              }}
            >
              {productDetails.name}
            </Typography>
            <Box
              sx={{
                background: `url(${productDetails.imageFull}) no-repeat center center`,
                width: 400,
                height: 400,
                borderRadius: 4,
                marginRight: 2,
              }}
            />

            <Typography variant="h6" sx={{ marginY: 1 }}>
              {currencyFormatterUSD.format(productDetails.price)}
            </Typography>
            <QuantityLabel code={productDetails.quantity} />
            <Typography variant="body1" sx={{ marginTop: 0.5 }}>
              {productDetails.descriptionFull}
            </Typography>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, justifyContent: "space-between" }}>
        <IconButton onClick={handleClickDeleteBtn}>
          <DeleteIcon />
        </IconButton>
        <Box>
          <Button onClick={onClose} sx={{ mr: 1 }} variant="outlined">
            Close
          </Button>
          <Button onClick={onActionClick} variant="contained">
            Edit
          </Button>
        </Box>
      </DialogActions>
      <Popover
        open={isDeletePopoverOpened}
        anchorEl={anchorEl}
        onClose={handleCloseDeletePopover}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            paddingX: 2,
            paddingY: 1,
          }}
        >
          <Typography sx={{ marginRight: 2 }}>Are you sure?</Typography>
          <Button color="error" variant="contained" onClick={handleDeleteClick}>
            Delete
          </Button>
        </Stack>
      </Popover>
    </Dialog>
  );
}
