// ** MUI Imports
import type { Theme } from "@mui/material/styles"

const Table = (theme: Theme) => {
  return {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          boxShadow: theme.shadows[0],
          borderTopColor: theme.palette.divider,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          textTransform: "uppercase",
          "& .MuiTableCell-head": {
            fontSize: "0.85rem",
            fontWeight: 600,
            letterSpacing: "0.2px",
          },
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-body": {
            letterSpacing: "0.2px",
            fontSize: "0.92rem",
            color: theme.palette.text.secondary,
            "&:not(.MuiTableCell-sizeSmall):not(.MuiTableCell-paddingCheckbox):not(.MuiTableCell-paddingNone)":
              {
                paddingTop: theme.spacing(2),
                paddingBottom: theme.spacing(2),
              },
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-head:first-of-child, & .MuiTableCell-root:first-of-child ": {
            paddingLeft: theme.spacing(5),
          },
          "& .MuiTableCell-head:last-child, & .MuiTableCell-root:last-child": {
            paddingRight: theme.spacing(5),
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${theme.palette.divider}`,
          "& .MuiButton-root": {
            textTransform: "uppercase",
            color: theme.palette.text.secondary,
          },
        },
        stickyHeader: {
          backgroundColor: theme.palette.customColors.tableHeaderBg,
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          paddingLeft: theme.spacing(5),
          paddingRight: theme.spacing(5),
          fontSize: "0.9375rem",
          color: theme.palette.text.secondary,
        },

        toolbar: {
          minHeight: "56px !important",
          paddingLeft: 0,
          paddingRight: 0,
        },

        displayedRows: {
          fontSize: "0.9375rem",
          fontWeight: 400,
          color: theme.palette.text.primary,
        },

        selectLabel: {
          fontSize: "0.9375rem",
          color: theme.palette.text.secondary,
        },

        select: {
          fontSize: "0.9375rem",
          color: theme.palette.text.primary,
          "&:focus": {
            backgroundColor: "transparent",
          },
        },

        actions: {
          marginLeft: theme.spacing(2),
          "& .MuiIconButton-root": {
            color: theme.palette.text.primary,
          },
        },
      },
    },
  }
}

export default Table
