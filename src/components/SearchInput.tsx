import * as React from 'react';
import { FunctionComponent } from 'react';
import {
    createStyles,
    InputBase,
    makeStyles,
    Paper,
    Theme
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginBottom: theme.spacing(2),
            padding: theme.spacing(1),
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        },
        input: {
            width: '100%'
        }
    })
);

const SearchInput: FunctionComponent = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder='Search or paste a URL'
                inputProps={{ 'aria-label': 'search or paste a URL' }}
            />
        </Paper>
    );
};

export default SearchInput;
