import { DependencyList, useCallback, useEffect, useState } from 'react';

type AsyncState = 'idle' | 'pending' | 'completed' | 'error';

type UseAsyncState<TResult> = {
    state: AsyncState;
    lastResult: TResult | null;
    lastError: Error | null;
};

function useAsync<TResult>(
    asyncFunction: () => Promise<TResult>,
    dependencies: DependencyList = []
): [UseAsyncState<TResult>, () => void] {
    const [asyncState, setAsyncState] = useState<AsyncState>('idle');
    const [lastResult, setLastResult] = useState<TResult | null>(null);
    const [lastError, setLastError] = useState<Error | null>(null);

    useEffect(() => {
        if (asyncState !== 'pending') {
            return;
        }

        let canceled = false;

        const run = async () => {
            try {
                const result = await asyncFunction();

                if (!canceled) {
                    setLastResult(result);
                    setAsyncState('completed');
                }
            } catch (error) {
                if (!canceled) {
                    setLastError(error);
                    setAsyncState('error');
                }
            }
        };

        run();

        return () => {
            canceled = true;
        };
    }, [asyncState, asyncFunction, ...dependencies]);

    const trigger = useCallback(() => {
        if (asyncState !== 'pending') {
            setAsyncState('pending');
        }
    }, [asyncState]);

    return [{ state: asyncState, lastResult, lastError }, trigger];
}

export default useAsync;
