import { createContext, useReducer } from 'react';

export const DeadlineContext = createContext();

export const deadlineReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DEADLINES':
            return {
                deadlines: action.payload
            }
        case 'CREATE_DEADLINE':
            return {
                deadlines: [action.payload, ...state.deadlines]
            }
        case 'DELETE_DEADLINE':
            return {
                deadlines: state.deadlines.filter(d => d._id !== action.payload._id)
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