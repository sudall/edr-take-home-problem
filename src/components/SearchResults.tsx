import * as React from 'react';
import { FunctionComponent } from 'react';
import { Box, Grid, makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    paper: {
        height: 140,
        width: '100%'
    }
}));

const SearchResults: FunctionComponent = () => {
    const classes = useStyles();

    const results: { id: number }[] = [];
    for (let i = 0; i < 50; i++) {
        results.push({
            id: i
        });
    }

    return (
        <>
            <Grid
                container
                justify='space-between'
                direction={'column'}
                spacing={1}
            >
                {results.map(value => (
                    <Grid key={value.id} item>
                        <Paper className={classes.paper} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default SearchResults;
