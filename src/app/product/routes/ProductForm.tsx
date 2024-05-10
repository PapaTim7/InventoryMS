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
  productUpdateDataSchema,
} from "./schema";
import { useForm } from "react-hook-form";
import { InputField, SelectField } from "@/components";
import { useEffect, useState } from "react";
import { addEditProduct, getProductById } from "../api";

export function ProductForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessSnackbarOpened, setIsSuccessSnackbarOpened] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const handleGoBackClick = () => {
    navigate("/products");
  };

  const handleCloseSnackbar = () => {
    setIsSuccessSnackbarOpened(false);
  };

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductSchemaValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (params?.id) {
      setIsLoading(true);
      getProductById(params.id)
        .then((res) => {
          reset(
            productUpdateDataSchema.parse(res) as unknown as ProductSchemaValues
          );
        })
        .catch(() => {
          console.error("Something went wrong");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [params, reset]);

  const onSubmit = (values: ProductSchemaValues) => {
    setIsSubmitting(true);
    setIsLoading(true);
    addEditProduct(values, params?.id)
      .then((res) => {
        if (res === 200) {
          setIsSuccessSnackbarOpened(true);
          setTimeout(() => {
            setIsSubmitting(false);
            navigate("/products");
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
            disabled={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            error={errors.price}
            label="Price"
            type="number"
            registration={register("price")}
            disabled={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            error={errors.quantity}
            label="Quantity"
            type="number"
            registration={register("quantity")}
            disabled={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SelectField
            control={control}
            name="condition"
            label={"Condition"}
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <InputField
            multiline
            rows={2}
            error={errors.descriptionFull}
            label="Full description"
            registration={register("descriptionFull")}
            disabled={isLoading}
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
