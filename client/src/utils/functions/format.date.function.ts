export function formatDate(
  dateInput: string | Date,
  format: string
): string {
  const date = new Date(dateInput)

  if (isNaN(date.getTime())) return ""

  const pad = (n: number) => String(n).padStart(2, "0")

  const hours24 = date.getHours()
  const hours12 = hours24 % 12 || 12
  const ampm = hours24 >= 12 ? "PM" : "AM"

  const map: Record<string, string> = {
    YYYY: String(date.getFullYear()),
    MM: pad(date.getMonth() + 1),
    DD: pad(date.getDate()),
    HH: pad(hours24),
    hh: pad(hours12),
    mm: pad(date.getMinutes()),
    ss: pad(date.getSeconds()),
    A: ampm,
  }

  return format.replace(
    /YYYY|MM|DD|HH|hh|mm|ss|A/g,
    (matched) => map[matched]
  )
}
