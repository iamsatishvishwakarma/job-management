import Box from "@mui/material/Box"
import { useTheme } from "@mui/material/styles"
import type { ComponentType } from "react"

type SvgIconComponent = ComponentType<{
  size?: number
  stroke?: number
  color?: string
}>

type AppIconProps =
  | {
      icon: SvgIconComponent
      src?: never
    }
  | {
      src: string
      icon?: never
    }

interface BaseProps {
  size?: number
  stroke?: number
  color?: string
  mr?: number
  ml?: number
  disabled?: boolean
}

const AppIcon = ({
  icon: Icon,
  src,
  size = 27,
  stroke = 1.5,
  color,
  mr = 0,
  ml = 0,
  disabled = false,
}: AppIconProps & BaseProps) => {
  const theme = useTheme()

  const finalColor = disabled
    ? theme.palette.text.disabled
    : color ?? theme.palette.text.secondary

  return (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        mr,
        ml,
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {/* React SVG Icon */}
      {Icon && (
        <Icon
          size={size}
          stroke={stroke}
          color={finalColor}
        />
      )}

      {/* Image Icon */}
      {src && (
        <Box
          component="img"
          src={src}
          alt="icon"
          sx={{
            width: size,
            height: size,
            objectFit: "contain",
          }}
        />
      )}
    </Box>
  )
}

export default AppIcon
