// ** MUI Imports
import type { Theme } from "@mui/material/styles"

const Tabs = (theme: Theme) => {
  return {
    MuiTabs: {
      styleOverrides: {
        vertical: {
          minWidth: 130,
          marginRight: theme.spacing(4),
          borderRight: `1px solid ${theme.palette.divider}`,
          "& .MuiTab-root": {
            minWidth: 130,
          },
        },
        indicator: {
          display: "none !important",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          borderRadius: theme.shape.borderRadius,
          marginRight: theme.spacing(1),
          transition: "all 0.2s",
          padding: theme.spacing(1, 2),
          fontWeight: 600,
          minHeight: 36,
          fontSize: "0.85rem",
        },
        icon: {
          fontSize: "1.35rem",
          marginRight: theme.spacing(1),
        },
        textColorSecondary: {
          "&.Mui-selected": {
            color: theme.palette.common.black,
            backgroundColor: theme.palette.secondary.main,
          },
        },
        textColorPrimary: {
          "&.Mui-selected": {
            color: theme.palette.common.white,
            backgroundColor: theme.palette.primary.main,
          },
        },
      },
    },
  }
}

export default Tabs
