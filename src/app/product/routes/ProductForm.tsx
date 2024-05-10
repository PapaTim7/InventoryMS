import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import {
  ProductConditionZod,
  productSchema,
  ProductSchemaValues,
} from "./schema";
import { useForm } from "react-hook-form";
import { InputField, SelectField } from "@/components";
import { useState } from "react";
import { addProduct } from "../api";

export function ProductForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessSnackbarOpened, setIsSuccessSnackbarOpened] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const handleGoBackClick = () => {
    navigate("../");
  };

  const handleCloseSnackbar = () => {
    setIsSuccessSnackbarOpened(false);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductSchemaValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {},
  });

  const onSubmit = (values: ProductSchemaValues) => {
    setIsSubmitting(true);
    setIsLoading(true);
    addProduct(values)
      .then((res) => {
        if (res === 200) {
          setIsSuccessSnackbarOpened(true);
          setTimeout(() => {
            setIsSubmitting(false);
            navigate("../");
          }, 1000);
        }
      })
      .catch(() => {
        console.error("Something went wrong");
        setIsSubmitting(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Box>
      <Button
        variant="text"
        size="small"
        startIcon={<ArrowBackIcon />}
        onClick={handleGoBackClick}
        sx={{ marginTop: 3 }}
        disabled={isLoading}
      >
        Back to the list
      </Button>
      <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
        <Typography variant="h3" sx={{ marginY: 3, marginRight: 2 }}>
          {params.id ? "Edit product" : "Add new product"}
        </Typography>
        {isLoading && <CircularProgress size={40} />}
      </Stack>
      <Grid
        container
        spacing={2}
        autoComplete="off"
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid item xs={12} md={6}>
          <InputField
            error={errors.name}
            label="Name"
            registration={register("name")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            error={errors.price}
            label="Price"
            type="number"
            registration={register("price")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            error={errors.quantity}
            label="Quantity"
            type="number"
            registration={register("quantity")}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectField
            control={control}
            name="condition"
            label={"Condition"}
            options={Object.entries(ProductConditionZod.enum).map(
              ([item, id]) => ({
                id,
                item,
              })
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            error={errors.descriptionShort}
            label="Short description"
            registration={register("descriptionShort")}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            multiline
            rows={2}
            error={errors.descriptionFull}
            label="Full description"
            registration={register("descriptionFull")}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack
            sx={{
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "end",
            }}
          >
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={isLoading || isSubmitting}
            >
              Submit
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Snackbar
        open={isSuccessSnackbarOpened}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Success! Product is {params.id ? "updated" : "added"}
        </Alert>
      </Snackbar>
    </Box>
  );
}
