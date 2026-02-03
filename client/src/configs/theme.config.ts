// ** MUI Imports
import type { PaletteMode } from "@mui/material"

export type ContentWidth = "full" | "boxed"

interface ThemeConfig {
  mode: PaletteMode
  routingLoader: boolean
  disableRipple: boolean
  navigationSize: number
  menuTextTruncate: boolean
  contentWidth: ContentWidth
  responsiveFontSizes: boolean
  locale: string
  enableMock: boolean
}

const themeConfig: ThemeConfig = {
  // ** Layout Configs
  mode: "light" /* light | dark */,
  contentWidth: "boxed" /* full | boxed */,

  // ** Routing Configs
  routingLoader: true /* true | false */,

  // ** Navigation (Menu) Configs
  menuTextTruncate: true /* true | false */,
  navigationSize: 258 /* Number in PX(Pixels) /*! Note: This is for Vertical navigation menu only */,

  // ** Other Configs
  responsiveFontSizes: true /* true | false */,
  disableRipple: false /* true | false */,

  locale: "en",
  enableMock: true,
}

export default themeConfig
