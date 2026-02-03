"use client"

import MuiContainer from "@mui/material/Container"
import { styled } from "@mui/material/styles"


const Container = styled(MuiContainer)(({ theme }) => ({
  background: theme.palette.background.default,
  height: "100vh",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
}))

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container maxWidth="xl">
      {children}
    </Container>
  )
}

export default AuthLayout
