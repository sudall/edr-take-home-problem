import * as React from 'react';
import { FunctionComponent, useEffect, useState } from 'react';
import {
    Button,
    Checkbox,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormGroup,
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

type Condition = 'Excellent' | 'Good' | 'Fair' | 'Poor';
const selectableConditions: Condition[] = ['Poor', 'Fair', 'Good', 'Excellent'];

type PartType = 'Engine' | 'Exhaust' | 'Cooling System' | 'Wheels';
const selectablePartTypes: PartType[] = [
    'Engine',
    'Exhaust',
    'Cooling System',
    'Wheels'
];

type Part = {
    partType: PartType;
};

const Search: FunctionComponent = () => {
    const [display, setDisplay] = useState<Display>('list');
    const [make, setMake] = useState<VehicleMake | ''>('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [isWholeVehicle, setIsWholeVehicle] = useState(false);
    const [vehicleCondition, setVehicleCondition] = useState<Condition | ''>(
        ''
    );
    const [selectedParts, setSelectedParts] = useState<Set<PartType>>(
        new Set()
    );

    const [asyncState, trigger] = useAsync(async () => {
        await SystemUtils.setTimeout(1000);
        return 'result';
    });

    useEffect(() => {
        setModel('');
    }, [make]);

    useEffect(() => {
        setYear('');
    }, [model, make]);

    return (
        <>
            <Box display={'flex'} height={'100vh'}>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    width={300}
                    padding={2}
                >
                    <Box overflow={'auto'} flexGrow={1}>
                        <TextField
                            fullWidth={true}
                            label={'Name or Address'}
                            margin={'dense'}
                        />
                        <FormControl fullWidth={true} margin={'dense'}>
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
                                        <MenuItem
                                            key={makeOption}
                                            value={makeOption}
                                        >
                                            {makeOption}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth={true} margin={'dense'}>
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
                                    vehicles[make] != null &&
                                    Object.keys(vehicles[make]).map(
                                        modelOption => {
                                            return (
                                                <MenuItem
                                                    key={modelOption}
                                                    value={modelOption}
                                                >
                                                    {modelOption}
                                                </MenuItem>
                                            );
                                        }
                                    )}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth={true} margin={'dense'}>
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
                                    (vehicles as any)[make][model] != null &&
                                    Object.keys(
                                        (vehicles as any)[make][model]
                                    ).map(yearOption => {
                                        return (
                                            <MenuItem
                                                key={yearOption}
                                                value={yearOption}
                                            >
                                                {yearOption}
                                            </MenuItem>
                                        );
                                    })}
                            </Select>
                        </FormControl>
                        <Box paddingLeft={1.5} paddingTop={1.5}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={isWholeVehicle}
                                            onChange={() =>
                                                setIsWholeVehicle(
                                                    !isWholeVehicle
                                                )
                                            }
                                        />
                                    }
                                    label='Whole Vehicle'
                                />
                                {isWholeVehicle && (
                                    <Box paddingLeft={2} width={'100%'}>
                                        <TextField
                                            fullWidth={true}
                                            label={'Price'}
                                            margin={'dense'}
                                        />
                                        <FormControl
                                            fullWidth={true}
                                            margin={'dense'}
                                        >
                                            <InputLabel htmlFor='vehicleCondition'>
                                                Condition
                                            </InputLabel>
                                            <Select
                                                inputProps={{
                                                    name: 'vehicleCondition',
                                                    id: 'vehicleCondition'
                                                }}
                                                value={vehicleCondition}
                                                onChange={event => {
                                                    const condition = event
                                                        .target
                                                        .value as Condition;
                                                    setVehicleCondition(
                                                        condition
                                                    );
                                                }}
                                            >
                                                {selectableConditions.map(
                                                    condition => {
                                                        return (
                                                            <MenuItem
                                                                key={condition}
                                                                value={
                                                                    condition
                                                                }
                                                            >
                                                                {condition}
                                                            </MenuItem>
                                                        );
                                                    }
                                                )}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                )}
                                {selectablePartTypes.map(partType => {
                                    return (
                                        <React.Fragment key={partType}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={selectedParts.has(
                                                            partType
                                                        )}
                                                        onChange={(
                                                            event,
                                                            checked
                                                        ) => {
                                                            const newSelectedParts = new Set(
                                                                selectedParts
                                                            );

                                                            if (checked) {
                                                                newSelectedParts.add(
                                                                    partType
                                                                );
                                                            } else {
                                                                newSelectedParts.delete(
                                                                    partType
                                                                );
                                                            }

                                                            setSelectedParts(
                                                                newSelectedParts
                                                            );
                                                        }}
                                                    />
                                                }
                                                label={partType}
                                            />
                                            {selectedParts.has(partType) && (
                                                <Box
                                                    paddingLeft={2}
                                                    width={'100%'}
                                                >
                                                    <TextField
                                                        fullWidth={true}
                                                        label={'Price'}
                                                        margin={'dense'}
                                                    />
                                                </Box>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </FormGroup>
                        </Box>
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
