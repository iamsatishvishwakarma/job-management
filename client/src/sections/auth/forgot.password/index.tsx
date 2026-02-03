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

import FormTextField from "@/components/ui/form/form.text.field"
import { _ROUTES } from "@/constants/route.constant"
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
}

interface ForgotPasswordFormData {
  emailAddress: string
}

const forgotSchema = yup.object({
  emailAddress: yup
    .string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
})

const ForgotPassword = () => {
  const router = useRouter()

  const methods = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotSchema),
    defaultValues,
  })

  const onSubmit = async () => {
    // optional: success toast or redirect
  }

  return (
    <Paper sx={{ width: 470 }}>
      <Card>
        <CardContent sx={{ p: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            Forgot Password
          </Typography>

          <Typography variant="body2" sx={{ mb: 4, color: (theme) => theme.palette.grey[500] }}>
            Please enter your email address to receive a link to reset your password
          </Typography>

          <FormProvider {...methods}>
            <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
              <Grid container spacing={4}>
                <Grid size={12}>
                  <Item>
                    <FormTextField
                      name="emailAddress"
                      label="Email Address"
                      type="email"
                    />
                  </Item>
                </Grid>

                <Grid size={12}>
                  <Item>
                    <Button type="submit" variant="contained" sx={{ width: "100%" }}>
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
            onClick={() => router.push(_ROUTES.AUTH.LOGIN)}
          >
            Back
          </Link>
        </CardContent>
      </Card>
    </Paper>
  )
}

export default ForgotPassword
