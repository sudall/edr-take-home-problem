import * as React from 'react';
import { FunctionComponent } from 'react';
import { Button, CircularProgress, TextField } from '@material-ui/core';
import SearchResults from 'components/SearchResults';
import useAsync from 'hooks/useAsync';
import SystemUtils from 'utils/SystemUtils';
import Box from '@material-ui/core/Box';

const Search: FunctionComponent = () => {
    const [asyncState, trigger] = useAsync(async () => {
        await SystemUtils.setTimeout(1000);
        return 'result';
    });

    return (
        <>
            <Box display={'flex'} flex height={'100vh'}>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    my={2}
                    width={300}
                    padding={2}
                >
                    <Box overflow={'auto'} flexGrow={1}>
                        <TextField fullWidth={true} label={'Name or Address'} />
                    </Box>
                    <Box my={2}>
                        <Button
                            variant={'contained'}
                            color={'primary'}
                            fullWidth={true}
                            onClick={() => {
                                trigger();
                            }}
                        >
                            {asyncState.state !== 'pending' && 'Search'}
                            {asyncState.state === 'pending' && (
                                <Box display={'flex'} justifyContent={'center'}>
                                    <CircularProgress
                                        size={24}
                                        color={'inherit'}
                                    />
                                </Box>
                            )}
                        </Button>
                    </Box>
                </Box>
                <Box flexGrow={1} padding={2} overflow={'auto'}>
                    {asyncState.lastResult != null && <SearchResults />}
                </Box>
            </Box>
        </>
    );
};

export default Search;
