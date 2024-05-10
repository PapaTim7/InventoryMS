import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";

export function ProductForm() {
  const navigate = useNavigate();
  const params = useParams();

  const handleAddNewClick = () => {
    navigate("../");
  };

  return (
    <Box>
      <Button
        variant="text"
        size="small"
        startIcon={<ArrowBackIcon />}
        onClick={handleAddNewClick}
        sx={{ marginTop: 3 }}
      >
        Back to the list
      </Button>
      <Typography variant="h3" sx={{ marginY: 3 }}>
        {params.id ? "Edit product" : "Add new product"}
      </Typography>
    </Box>
  );
}
