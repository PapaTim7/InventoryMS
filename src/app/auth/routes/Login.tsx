import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { LoginSchemaValues, loginSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InputField } from "@/components";
import { logIn } from "../api";

export function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaValues>({
    resolver: zodResolver(loginSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (values: LoginSchemaValues) => {
    setIsSubmitting(true);
    logIn(values.username)
      .then((res) => {
        if (res === 200) {
          navigate("/products");
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Typography variant="body1">Log in to use the app</Typography>
      <Typography variant="body2" sx={{ marginBottom: 3, marginTop: 0.5 }}>
        (use random data, for example User/User)
      </Typography>
      <Stack sx={{ width: { xs: "100%", md: 400 } }}>
        <InputField
          error={errors.username}
          label="Username"
          registration={register("username")}
        />
        <InputField
          error={errors.password}
          label="Password"
          registration={register("password")}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 1.5 }}
          disabled={isSubmitting}
        >
          Log in
        </Button>
      </Stack>
    </Stack>
  );
}
