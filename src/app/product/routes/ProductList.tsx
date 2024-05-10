import { useCallback, useEffect, useState } from "react";
import { deleteProduct, getAllProducts, getProductById } from "../api";
import { ProductFullT, ProductT } from "./Product.types";
import { SearchInput, SkeletonGroup } from "@/components";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { ProductDetailsDialog } from "./common/ProductDetailsDialog";
import { currencyFormatterUSD } from "@/utils";
import { QuantityLabel } from "./common/QuantityLabel";

export function ProductList() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<ProductT[]>([]);
  const [isProductLoading, setIsProductLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<
    ProductFullT | undefined
  >(undefined);
  const [isDeleteSnackbarOpened, setIsDeleteSnackbarOpened] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleGetAllProducts = (searchName?: string) => {
    setIsLoading(true);
    getAllProducts(searchName)
      .then((res: ProductT[]) => {
        setProducts(res);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    // initial
    handleGetAllProducts(searchText);
  }, [searchText]);

  const handleSelectProduct = (productId: string) => {
    setIsProductLoading(true);
    getProductById(productId)
      .then((res) => {
        if (res) {
          setSelectedProduct(res);
        } else {
          // Here could Snackbar calling (something went wrong)
        }
      })
      .finally(() => setIsProductLoading(false));
  };

  const handleCloseProductDetails = () => {
    setSelectedProduct(undefined);
  };

  const handleCloseDeleteSnackbar = () => {
    setIsDeleteSnackbarOpened(false);
  };

  const handleDeleteProduct = useCallback(() => {
    if (selectedProduct) {
      setIsProductLoading(true);
      deleteProduct(selectedProduct.id)
        .then((res) => {
          if (res === 200) {
            setIsDeleteSnackbarOpened(true);
            // re-fetch products
            handleGetAllProducts();
          }
        })
        .finally(() => setIsProductLoading(false));
    }
  }, [selectedProduct]);

  return (
    <Stack>
      {isProductLoading ? (
        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
            position: "fixed",
            top: "20%",
          }}
        >
          <CircularProgress size={100} />
        </Stack>
      ) : null}
      <Typography variant="h3" sx={{ marginY: 3 }}>
        Product List
      </Typography>
      <SearchInput
        onChangeText={setSearchText}
        value={searchText}
        sx={{ mb: 3, maxWidth: 400 }}
        placeholder="Search product by name"
      />
      {isLoading ? (
        <SkeletonGroup height={100} />
      ) : (
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {products.length ? (
            products.map((item: ProductT) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Paper
                  elevation={0}
                  sx={{ padding: 2, boxShadow: 2, "&:hover": { boxShadow: 5 } }}
                >
                  <Stack sx={{ flexDirection: "row", marginBottom: 1 }}>
                    <Box
                      sx={{
                        background: `url(${item.imagePreview}) no-repeat center center`,
                        width: 120,
                        height: 120,
                        borderRadius: 4,
                        marginRight: 2,
                      }}
                    />
                    <Box
                      sx={{ maxWidth: "calc(100% - 140px)", paddingTop: 1.5 }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="h6">
                        {currencyFormatterUSD.format(item.price)}
                      </Typography>
                      <QuantityLabel code={item.quantity} />
                    </Box>
                  </Stack>
                  <Typography variant="body1">
                    {item.descriptionShort}
                  </Typography>
                  <Stack sx={{ flexDirection: "row", justifyContent: "end" }}>
                    <Button
                      disabled={isProductLoading}
                      size="small"
                      onClick={handleSelectProduct.bind("", item.id)}
                    >
                      Details
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography variant="body2" sx={{ margin: 3 }}>
              No data found
            </Typography>
          )}
        </Grid>
      )}
      <ProductDetailsDialog
        productDetails={selectedProduct}
        isDialogOpen={!!selectedProduct}
        onActionClick={() => {}}
        onDeleteClick={handleDeleteProduct}
        onClose={handleCloseProductDetails}
      />
      <Snackbar
        open={isDeleteSnackbarOpened}
        autoHideDuration={2000}
        onClose={handleCloseDeleteSnackbar}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Success! Product is deleted
        </Alert>
      </Snackbar>
    </Stack>
  );
}
