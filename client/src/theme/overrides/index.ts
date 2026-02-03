// ** MUI Imports
import type { Theme } from "@mui/material/styles"

import MuiAccordion from "./mui-accordion"
import MuiAlerts from "./mui-alerts"
import MuiAvatar from "./mui-avatars"
import MuiBackdrop from "./mui-backdrop"
import MuiButton from "./mui-button"
// ** Overrides Imports
import MuiCard from "./mui-card"
import MuiCheckbox from "./mui-checkbox"
import MuiChip from "./mui-chip"
import MuiDateTimePicker from "./mui-date-time-picker"
import MuiDialog from "./mui-dialog"
import MuiDivider from "./mui-divider"
import MuiInput from "./mui-input"
import MuiLink from "./mui-link"
import MuiList from "./mui-list"
import MuiMenu from "./mui-menu"
import MuiPagination from "./mui-pagination"
import MuiPaper from "./mui-paper"
import MuiPopover from "./mui-popover"
import MuiSelect from "./mui-select"
import MuiSnackbar from "./mui-snackbar"
import MuiSwitches from "./mui-switches"
import MuiTable from "./mui-table"
import MuiTabs from "./mui-tabs"
import MuiTimeline from "./mui-timeline"
import MuiToggleButton from "./mui-toggle-button"
import MuiTooltip from "./mui-tooltip"
import MuiTypography from "./mui-typography"

const Overrides = (theme: Theme) => {
  const chip = MuiChip(theme)
  const list = MuiList(theme)
  const menu = MuiMenu(theme)
  const tabs = MuiTabs(theme)
  const cards = MuiCard(theme)
  const input = MuiInput(theme)
  const tables = MuiTable(theme)
  const alerts = MuiAlerts(theme)
  const button = MuiButton(theme)
  const avatars = MuiAvatar(theme)
  const divider = MuiDivider(theme)
  const dialog = MuiDialog(theme)
  const popover = MuiPopover(theme)
  const tooltip = MuiTooltip(theme)
  const backdrop = MuiBackdrop(theme)
  const snackbar = MuiSnackbar(theme)
  const switches = MuiSwitches(theme)
  const timeline = MuiTimeline(theme)
  const accordion = MuiAccordion(theme)
  const pagination = MuiPagination(theme)
  const dateTimePicker = MuiDateTimePicker(theme)
  const checkbox = MuiCheckbox(theme)

  return Object.assign(
    chip,
    list,
    menu,
    tabs,
    cards,
    input,
    alerts,
    button,
    dialog,
    tables,
    avatars,
    divider,
    MuiLink,
    popover,
    tooltip,
    backdrop,
    MuiPaper,
    snackbar,
    switches,
    timeline,
    accordion,
    MuiSelect,
    pagination,
    MuiTypography,
    dateTimePicker,
    MuiToggleButton,
    checkbox
  )
}

export default Overrides
