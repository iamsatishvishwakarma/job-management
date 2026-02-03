"use client"
import { yupResolver } from "@hookform/resolvers/yup"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import MuiCard from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import MuiPaper from "@mui/material/Paper"
import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { FormProvider, useForm } from "react-hook-form"
import * as yup from "yup"

import FormPasswordField from "@/components/ui/form/form.password.field"
import FormTextField from "@/components/ui/form/form.text.field"
import { APP_NAME } from "@/constants/app.constant"
import { _ROUTES } from "@/constants/route.constant"
import { useLoginMutation } from "@/features/auth/auth.api"
import { useRouter } from "@/utils/hooks/routes/use.router"

const Paper = styled(MuiPaper)(() => ({
  boxShadow: "none",
}))

const Card = styled(MuiCard)(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex",
  flexDirection: "column",
  border: "none",
}))

const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  border: "none",
}))

const defaultValues = {
  emailAddress: "",
  password: "",
}

interface LoginFormData {
  emailAddress: string
  password: string
}

const loginSchema = yup.object({
  emailAddress: yup
    .string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),

  password: yup
    .string()
    .min(
      6,
      "Please enter at least 6 characters for your password")
    .max(
      10,
      "Please enter at most 10 characters for your password")
    .required("Please enter your password"),
})

const Login = () => {
  const router = useRouter()
  const [login, { isLoading }] = useLoginMutation()

  const methods = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues,
  })

  const onSubmit = async (data: LoginFormData) => {
    await login(data).unwrap()
    router.push(_ROUTES.ROOT)
  }

  return (
    <Paper sx={{ width: 470 }}>
      <Card>
        <CardContent sx={{ p: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            Welcome to {APP_NAME}
          </Typography>

          <Typography variant="body2" sx={{ mb: 4, color: (theme) => theme.palette.grey[500] }}>
            Please sign in to your account
          </Typography>

          <FormProvider {...methods}>
            <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
              <Grid container spacing={4}>
                <Grid size={12}>
                  <Item>
                    <FormTextField
                      name="emailAddress"
                      label="Email Address"
                      autoComplete="emailAddress"
                    />
                  </Item>
                </Grid>

                <Grid size={12}>
                  <Item>
                    <FormPasswordField
                      name="password"
                      label="Password"
                      type="password"
                      autoComplete="password"
                    />
                  </Item>
                </Grid>

                <Grid size={12}>
                  <Item>
                    <Button
                      loading={isLoading}
                      type="submit"
                      variant="contained"
                      sx={{ width: "100%" }}
                    >
                      Submit
                    </Button>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </FormProvider>

          <Link
            component="button"
            variant="body2"
            underline="hover"
            sx={{ color: "text.main", userSelect: "none", mt: 3 }}
            onClick={() => router.push(_ROUTES.AUTH.FORGOT_PASSWORD)}
          >
            Forgot Password
          </Link>
        </CardContent>
      </Card>
    </Paper>
  )
}

export default Login
