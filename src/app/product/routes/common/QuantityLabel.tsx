import { Stack, Typography } from "@mui/material";
import { ProductQuantityT } from "../Product.types";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";

const quantityLabelsMap: Record<ProductQuantityT, JSX.Element> = {
  high: <StarBorderPurple500Icon sx={{ color: "success.light" }} />,
  medium: <ThumbUpAltOutlinedIcon sx={{ color: "warning.light" }} />,
  low: <ThumbDownAltOutlinedIcon sx={{ color: "error.main" }} />,
};

type QuantityLabelPropsT = {
  code: ProductQuantityT;
};

export function QuantityLabel({ code }: QuantityLabelPropsT) {
  return (
    <Stack
      sx={{
        textTransform: "capitalize",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Typography variant="body1">Quality:</Typography>
      <Typography
        variant="body1"
        sx={{ marginLeft: 0.5, marginRight: 1, fontWeight: "bold" }}
      >
        {code}
      </Typography>
      {quantityLabelsMap[code]}
    </Stack>
  );
}
