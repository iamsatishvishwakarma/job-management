// ** MUI Imports
import type { Theme } from "@mui/material/styles"

const Chip = (theme: Theme) => {
  return {
    MuiChip: {
      styleOverrides: {
        root: {
          height: 24,
          fontSize: "0.8125rem",
          textTransform: "capitalize",
          "& .MuiChip-label": { fontWeight: 500 },
        },
        outlined: {
          "&.MuiChip-colorDefault": {
            borderColor: `rgba(${theme.palette.customColors.main}, 0.22)`,
          },
        },
        deleteIcon: {
          width: 18,
          height: 18,
        },
      },
    },
  }
}

export default Chip
