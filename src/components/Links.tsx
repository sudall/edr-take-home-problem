import * as React from 'react';
import { FunctionComponent } from 'react';
import { Box, Grid, makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    paper: {
        height: 140,
        width: 100
    }
}));

const Links: FunctionComponent = () => {
    const classes = useStyles();

    const links = [];
    for (let i = 0; i < 50; i++) {
        links.push({
            id: i
        });
    }

    return (
        <>
            <Grid container justify='space-between' spacing={1}>
                {links.map(value => (
                    <Grid key={value.id} item>
                        <Paper className={classes.paper} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Links;
