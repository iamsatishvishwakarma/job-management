import { type Theme } from "@mui/material/styles"

const Checkbox = (theme: Theme) => {
  return {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),

          "& svg": {
            fontSize: "1.5rem",
          },

          "&.Mui-checked": {
            color: theme.palette.primary.main,
          },

          "&.MuiCheckbox-indeterminate": {
            color: theme.palette.primary.main,
          },

          "&.Mui-disabled": {
            color: theme.palette.action.disabled,
          },
        },
      },
    },

    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(0),
          marginRight: theme.spacing(0),
        },
        label: {
          fontSize: "0.975rem",
          color: theme.palette.text.primary,
        },
      },
    },
  }
}

export default Checkbox
