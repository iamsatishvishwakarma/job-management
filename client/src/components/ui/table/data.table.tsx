"use client"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import Paper from "@mui/material/Paper"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import React, { useRef, useLayoutEffect, useState } from "react"

import { _PAGINATION } from "@/constants/app.constant"

import TableNoData from "./table.no.data"
import TableSkeleton from "./table.skeleton"

export interface Column {
  id: string
  label: string
  align?: "left" | "right" | "center"
  minWidth?: number
  format?: (value: unknown) => React.ReactNode
}

export interface DataRow {
  id: number | string
  [key: string]: string | number | React.ReactNode
}

export interface PaginationProps {
  rowsPerPage: number
  page: number
  totalRows: number
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface DataTableProps<T extends DataRow> {
  loading: boolean
  rows: T[]
  columns: Column[]
  pagination: PaginationProps
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: "relative",
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[0],
}))

const StyledTableContainer = styled(TableContainer)({
  position: "relative",
})

const BodyOverlay = styled(Box)({
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(255,255,255,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
  pointerEvents: "none",
})

const DimmedTableBody = styled(TableBody)<{ loading: "true" | "false" }>(({ loading }) => ({
  opacity: loading === "true" ? 0.6 : 1,
  transition: "opacity 0.2s ease",
}))

const DataTable = <T extends DataRow>({
  loading = false,
  rows,
  columns,
  pagination,
}: DataTableProps<T>) => {
  const { rowsPerPage, page, totalRows, handleChangePage, handleChangeRowsPerPage } = pagination

  const headRef = useRef<HTMLTableSectionElement>(null)
  const [headHeight, setHeadHeight] = useState(0)

  // dynamically measure header height (no magic number 🔥)
  useLayoutEffect(() => {
    if (headRef.current) {
      setHeadHeight(headRef.current.getBoundingClientRect().height)
    }
  }, [columns])

  return (
    <StyledPaper>
      <StyledTableContainer>
        {/* BODY-ONLY OVERLAY */}
        {loading && rows.length > 0 && (
          <BodyOverlay style={{ top: headHeight }}>
            <CircularProgress />
          </BodyOverlay>
        )}

        <Table stickyHeader>
          {/* HEADER */}
          <TableHead ref={headRef}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* FIRST LOAD */}
          {loading && rows.length === 0 && (
            <TableSkeleton rows={rowsPerPage} columns={columns.length} />
          )}

          {!loading && rows.length === 0 && <TableNoData colSpan={columns.length} />}

          {/* BODY */}
          {rows.length > 0 && (
            <DimmedTableBody loading={loading ? "true" : "false"}>
              {rows.map((row) => (
                <TableRow hover key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id]
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </DimmedTableBody>
          )}
        </Table>
      </StyledTableContainer>

      {rows.length > 0 && (
        <TablePagination
          rowsPerPageOptions={_PAGINATION.ROW_PER_PAGE_OPTIONS}
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </StyledPaper>
  )
}

export default DataTable
