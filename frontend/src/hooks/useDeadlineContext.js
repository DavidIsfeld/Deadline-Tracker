// use this hook to get to DeadlineContext so it is not used outside of DeadlineContextProvider

import { DeadlineContext } from '../context/DeadlineContext';
import { useContext } from 'react';

export const useDeadlineContext = () => {
    const context = useContext(DeadlineContext);

    if (!context) {
        throw Error('useDeadlineContext must be provided inside a DeadlineContextProvider');
    }

    return context;
};