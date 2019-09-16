import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
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
            <Search/>
        </ThemeProvider>
    );
}
