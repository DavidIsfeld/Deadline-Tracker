import { createContext, useReducer } from 'react';

export const DeadlineContext = createContext();

export const deadlineReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DEADLINES':
            return {
                deadlines: action.payload
            }
        default:
            return state;
    }
};

export const DeadlineContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(deadlineReducer, {
        deadlines: null
    });

    return ( 
        <DeadlineContext.Provider value={{...state, dispatch}}>
            { children }
        </DeadlineContext.Provider>
     );
};