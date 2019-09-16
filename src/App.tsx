import React from 'react';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import Search from 'components/Search';

export default function App() {
    const theme = createMuiTheme({
        palette: {
            primary: blueGrey,
            type: 'dark'
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Search />
        </ThemeProvider>
    );
}
