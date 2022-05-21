import { createTheme } from "@mui/material"

declare module '@mui/material/styles' {
    interface Palette {
        strong: Palette['primary']
        neutral: Palette['primary']
        weak: Palette['primary']
        immune: Palette['primary']
    }
  
    interface PaletteOptions {
        strong?: PaletteOptions['primary']
        neutral?: PaletteOptions['primary']
        weak?: PaletteOptions['primary']
        immune?: PaletteOptions['primary']
    }
}
  
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        strong: true
        neutral: true
        weak: true
        immune: true
    }
}

declare module '@mui/material/Chip' {
    interface ButtonPropsColorOverrides {
        strong: true
        neutral: true
        weak: true
        immune: true
    }
}


export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#ff1744',
        },
        secondary: {
            main: '#d500f9',
        },
        strong: {
            main: '#00e676',
        },
        neutral: {
            main: '#b0bec5',
        },
        weak: {
            main: '#ff1744',
        },
        immune: {
            main: '#000000',
        },
    },
})