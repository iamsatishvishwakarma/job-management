export interface PaginationParams {
  page?: number // current page (0 or 1 based on your UI)
  limit?: number // page size
  search?: string // optional search
  status?: string // optional filter
  sortBy?: string // optional sorting key
  order?: "asc" | "desc" // optional sorting order
}

export interface PaginationMeta {
  total: number // total records from backend
  page: number // current page backend returned
  limit: number // per page limit
  totalPages: number // backend calculated pages
  search?: string
}

export interface PaginationResponse<T> {
  data: {
    data: T[]
    meta: PaginationMeta
  }
}
