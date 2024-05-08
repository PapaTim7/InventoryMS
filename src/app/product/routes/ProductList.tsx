import { useEffect, useState } from "react";
import { getAllProducts } from "../api";
import { ProductT } from "./Product.types";
import { SkeletonGroup } from "@/components";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";

export function ProductList() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductT[]>([]);

  useEffect(() => {
    // initial
    setLoading(true);
    getAllProducts()
      .then((res: ProductT[]) => {
        setProducts(res);
      })
      .finally(() => setLoading(false));
  }, []);

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
                  <Button size="small">Details</Button>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Stack>
  );
}
