import { Grid, Skeleton } from "@mui/material";
import { SkeletonGroupPropsT } from "./SkeletonGroup.types";

export function SkeletonGroup({
  count = 12,
  height = 24,
  skeletonProps,
}: SkeletonGroupPropsT) {
  return (
    <Grid container spacing={2}>
      {new Array(count).fill(null).map((_, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={3}
          xl={2}
          key={`loading-skeleton-${index}`}
        >
          <Skeleton height={height} {...skeletonProps} />
        </Grid>
      ))}
    </Grid>
  );
}
