// MUI Imports
import Skeleton from "@mui/material/Skeleton"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
interface TableSkeletonProps {
  rows: number
  columns: number
}

export default function TableSkeleton({ rows, columns }: TableSkeletonProps) {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex} sx={{ padding: 1 }}>
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}
