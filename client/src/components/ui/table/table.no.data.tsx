
"use client"
import Box from "@mui/material/Box"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import { memo, type FC } from "react"

import NoData from "@/assets/illustrations/no-data.svg"

interface TableNoDataProps {
  colSpan: number
}

const TableNoData: FC<TableNoDataProps> = ({ colSpan }) => {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} align="center">
        <Box
          sx={{
            py: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.85,
          }}
        >
          <Box
            component="img"
            src={NoData}
            alt="No Data"
            sx={{
              width: 120,
              height: 100,
              mb: 5,
              opacity: 0.75,
            }}
          />

          <Typography variant="h6">Data not found</Typography>

          <Typography variant="body1" color="text.secondary">
            Please try again later.
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  )
}

export default memo(TableNoData)
