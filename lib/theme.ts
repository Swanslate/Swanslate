import {
    createTheme,
    ThemeProvider,
    responsiveFontSizes,
} from "@material-ui/core/styles";

let theme = createTheme();
theme = responsiveFontSizes(theme);

theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 500,
            md: 768,
            lg: 1280,
            xl: 1920
        }
    },
    palette: {
        primary: {
            //light: '#36ced3',
            main: "#1F7199",
        },
        secondary: {
            light: "#E97C00",
            main: "#DF5000",
        },
        // info: {},
        // error: {

        // },
        warning: { main: "#FF0000" },
        // success: {},
        common: {
            black: "#4E4E4E",
            white: "#F6F6F6",
        },
        // divider: "",


    },
    typography: {
        fontFamily: `"Georgia","Poppins","Quicksand","Open Sans","Raleway","Raleway-semibold","Roboto", "Helvetica", "Arial", sans-serif`,
        h2: {
            fontSize: "30pt",
            [theme.breakpoints.down("sm")]: {
                fontSize: "25pt",
            },
        },
        h3: {
            fontSize: "18pt",
            [theme.breakpoints.down("sm")]: {
                fontSize: "14pt",
            },
        },
        body1: {
            fontSize: "12pt",
            [theme.breakpoints.down("sm")]: {
                fontSize: "12px",
            },
        },
    },
});

export default theme;