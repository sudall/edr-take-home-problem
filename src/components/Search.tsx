import * as React from 'react';
import { FunctionComponent } from 'react';
import SearchInput from 'components/SearchInput';
import { Button, CircularProgress } from '@material-ui/core';
import Links from 'components/Links';
import useAsync from 'hooks/useAsync';
import SystemUtils from 'utils/SystemUtils';

type SearchParameters = {
    geographicArea: {
        positionLatLong;
        radiusMeters;
    };
    car: {
        year: number;
        make: Make;
        model: Model;
        condition: KelleyBlueBlookCondition;
    };
    searchText: string;
};

const Search: FunctionComponent = () => {
    const [asyncState, trigger] = useAsync(() => {
        return SystemUtils.setTimeout(1000);
    });

    return (
        <>
            <SearchInput />
            <Button
                onClick={() => {
                    trigger();
                }}
            >
                Search
            </Button>
            {asyncState.state === 'pending' && <CircularProgress />}
            {asyncState.lastResult !== null && <Links />}
        </>
    );
};

export default Search;
