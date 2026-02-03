export interface ApiError {
  status?: number
  data?: {
    message?: string
    [key: string]: unknown
  }
  error?: string
  message?: string
  originalStatus?: number
}
