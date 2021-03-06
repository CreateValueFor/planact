export type themeType = 'theme/light/orange' | 'theme/dark/orange'
interface Colorset {
  main: string
  text: string
  border: string
}

export interface DefaultTheme {
  mode_name: themeType

  mainBackground: string
  content: string
  border: string
  title: string
  text: string
  disabled: string
  selected: string
  // point-color
  // default: Colorset;
  primary: Colorset
  secondary: Colorset
  ghost: Colorset
}
