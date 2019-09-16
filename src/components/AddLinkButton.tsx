import * as React from 'react';
import { FunctionComponent } from 'react';
import { createStyles, Fab, makeStyles, Theme } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(2)
        }
    })
);

const AddLinkButton: FunctionComponent = () => {
    const classes = useStyles();

    return (
        <>
            <Fab color='primary' aria-label='add' className={classes.fab}>
                <AddIcon />
            </Fab>
        </>
    );
};

export default AddLinkButton;
