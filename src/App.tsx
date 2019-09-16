import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { Button, createMuiTheme, CssBaseline } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import Links from 'components/Links';
import SearchInput from 'components/SearchInput';
import { ThemeProvider } from '@material-ui/styles';
import Search from 'components/Search';

function Copyright() {
    return (
        <Typography variant='body2' color='textSecondary' align='center'>
            {'Copyright © '}
            <Link color='inherit' href='https://material-ui.com/'>
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'. Built with '}
            <Link color='inherit' href='https://material-ui.com/'>
                Material-UI.
            </Link>
        </Typography>
    );
}

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
            <Container maxWidth='sm'>
                <Box my={4}>
                    {/*<Typography variant='h4' component='h1' gutterBottom>*/}
                    {/*    Welcome to Linker*/}
                    {/*</Typography>*/}
                    {/*<ProTip />*/}

                    <Search/>

                    {/*<Copyright />*/}
                </Box>
            </Container>
            {/*<AddLinkButton />*/}
        </ThemeProvider>
    );
}
