import type { Components, Theme } from "@mui/material/styles"

const drawerComponents: Components<Theme> = {
  MuiDrawer: {
    styleOverrides: {
      root: {
        "& .MuiBackdrop-root": {
          backgroundColor: "#3a3541b3",
          backdropFilter: "blur(0.1px)",
        },
      },
      paper: ({ theme }) => ({
        // backgroundColor: theme.palette.background.paper,
        borderRadius: 0,
        minWidth: 400,
        boxShadow: theme.shadows[6],
      }),
    },
  },
}

export default drawerComponents
