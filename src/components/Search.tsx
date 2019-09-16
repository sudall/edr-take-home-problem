import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import {
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@material-ui/core';
import SearchResults from 'components/SearchResults';
import useAsync from 'hooks/useAsync';
import SystemUtils from 'utils/SystemUtils';
import Box from '@material-ui/core/Box';

type Display = 'map' | 'list';

const vehicles = {
    Subaru: {
        Impreza: {
            '1999': {},
            '2012': {}
        },
        Forester: {
            '1993': {},
            '2002': {}
        }
    },
    Tesla: {
        'Model 3': {
            '2019': {}
        },
        'Model X': {
            '2016': {}
        }
    }
};

type Vehicles = typeof vehicles;
type VehicleMake = keyof Vehicles;

const Search: FunctionComponent = () => {
    const [display, setDisplay] = useState<Display>('map');
    const [make, setMake] = useState<VehicleMake | ''>('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');

    const [asyncState, trigger] = useAsync(async () => {
        await SystemUtils.setTimeout(1000);
        return 'result';
    });

    return (
        <>
            <Box display={'flex'} height={'100vh'}>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    my={2}
                    width={300}
                    padding={2}
                >
                    <Box overflow={'auto'} flexGrow={1}>
                        <TextField
                            fullWidth={true}
                            label={'Name or Address'}
                            margin={'normal'}
                        />
                        <FormControl fullWidth={true} margin={'normal'}>
                            <InputLabel htmlFor='make'>Make</InputLabel>
                            <Select
                                inputProps={{
                                    name: 'make',
                                    id: 'make'
                                }}
                                value={make}
                                onChange={event => {
                                    const newMake = event.target
                                        .value as VehicleMake;
                                    setMake(newMake);
                                }}
                            >
                                {Object.keys(vehicles).map(makeOption => {
                                    return (
                                        <MenuItem value={makeOption}>
                                            {makeOption}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth={true} margin={'normal'}>
                            <InputLabel htmlFor='model'>Model</InputLabel>
                            <Select
                                inputProps={{
                                    name: 'model',
                                    id: 'model'
                                }}
                                value={model}
                                onChange={event => {
                                    setModel(event.target.value as string);
                                }}
                            >
                                {make !== '' &&
                                    Object.keys(vehicles[make]).map(
                                        modelOption => {
                                            return (
                                                <MenuItem value={modelOption}>
                                                    {modelOption}
                                                </MenuItem>
                                            );
                                        }
                                    )}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth={true} margin={'normal'}>
                            <InputLabel htmlFor='year'>Year</InputLabel>
                            <Select
                                inputProps={{
                                    name: 'year',
                                    id: 'year'
                                }}
                                value={year}
                                onChange={event => {
                                    setYear(event.target.value as string);
                                }}
                            >
                                {make !== '' &&
                                    model !== '' &&
                                    Object.keys(
                                        (vehicles as any)[make][model]
                                    ).map(yearOption => {
                                        return (
                                            <MenuItem value={yearOption}>
                                                {yearOption}
                                            </MenuItem>
                                        );
                                    })}
                            </Select>
                        </FormControl>
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
                    {asyncState.lastResult != null && (
                        <>
                            {display === 'list' && <SearchResults />}
                            {display === 'map' && 'Map'}
                            <Box
                                position={'absolute'}
                                bottom={0}
                                right={0}
                                marginBottom={3}
                                marginRight={3}
                            >
                                <Button
                                    variant={'contained'}
                                    color={'secondary'}
                                    onClick={() => {
                                        setDisplay(
                                            display === 'map' ? 'list' : 'map'
                                        );
                                    }}
                                >
                                    {display === 'map' && 'Show List'}
                                    {display === 'list' && 'Show Map'}
                                </Button>
                            </Box>
                        </>
                    )}
                    {asyncState.lastResult == null && 'Map'}
                </Box>
            </Box>
        </>
    );
};

export default Search;
