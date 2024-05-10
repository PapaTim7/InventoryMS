import { Stack, Typography } from "@mui/material";
import { ProductConditionT } from "../Product.types";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";

const conditionLabelsMap: Record<ProductConditionT, JSX.Element> = {
  high: <StarBorderPurple500Icon sx={{ color: "success.light" }} />,
  medium: <ThumbUpAltOutlinedIcon sx={{ color: "warning.light" }} />,
  low: <ThumbDownAltOutlinedIcon sx={{ color: "error.main" }} />,
};

type ConditionLabelPropsT = {
  code: ProductConditionT;
};

export function ConditionLabel({ code }: ConditionLabelPropsT) {
  return (
    <Stack
      sx={{
        textTransform: "capitalize",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Typography variant="body1">Condition:</Typography>
      <Typography
        variant="body1"
        sx={{ marginLeft: 0.5, marginRight: 1, fontWeight: "bold" }}
      >
        {code}
      </Typography>
      {conditionLabelsMap[code]}
    </Stack>
  );
}
