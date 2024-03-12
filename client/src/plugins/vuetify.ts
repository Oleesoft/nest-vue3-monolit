/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Import wamewo colors
import { WAMEWO_ORANGE, wamewoColorPalette } from '@/wamewo.colors'


// Composables
import { ThemeDefinition, createVuetify } from 'vuetify'

export const wamewoTheme: ThemeDefinition = {
  dark: true,
  colors: {
    background: wamewoColorPalette['dark-gray'],
    surface: wamewoColorPalette['dark-gray-lighter'],
    primary: WAMEWO_ORANGE,
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: wamewoColorPalette.red,
    info: wamewoColorPalette.blue,
    success: wamewoColorPalette.green,
    warning: wamewoColorPalette.yellow,
  },
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'wamewoTheme',
    themes: {
      wamewoTheme,
    }
  },
})
