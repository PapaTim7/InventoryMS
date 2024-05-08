import { useEffect, useState } from "react";
import { getAllProducts } from "../api";
import { ProductFullT, ProductT } from "./Product.types";
import { SkeletonGroup } from "@/components";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { ProductDetailsDialog } from "./ProductDetailsDialog";

export function ProductList() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductT[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductFullT | null>(
    null
  );

  useEffect(() => {
    // initial
    setLoading(true);
    getAllProducts()
      .then((res: ProductT[]) => {
        setProducts(res);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSelectProduct = (productId: string) => {
    // TODO add product loading
    setSelectedProduct({
      id: "0715206357401",
      name: "Product 1",
      quantity: "high",
      descriptionShort: "Product 1 short description",
      descriptionFull:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      price: 1001,
      imagePreview: "https://placehold.co/120x120/orange/white?text=Prod+1",
      imageFull:
        "https://placehold.co/600x600/orange/white?text=Product+1+image",
    });
  };

  const handleCloseProductDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <Stack>
      <Typography variant="h5" sx={{ marginY: 3 }}>
        Product List
      </Typography>
      {loading ? (
        <SkeletonGroup height={100} />
      ) : (
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {products.map((item: ProductT) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Paper elevation={4} sx={{ padding: 2 }}>
                <Typography variant="body1">{item.name}</Typography>
                <Stack sx={{ flexDirection: "row", justifyContent: "end" }}>
                  <Button
                    size="small"
                    onClick={handleSelectProduct.bind("", item.id)}
                  >
                    Details
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
      <ProductDetailsDialog
        isDialogOpen={!!selectedProduct}
        onActionClick={() => {}}
        onClose={handleCloseProductDetails}
      />
    </Stack>
  );
}
