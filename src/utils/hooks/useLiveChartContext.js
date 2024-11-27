import React, { useContext, useReducer, createContext } from 'react';
import { createRandomEvent } from '../utils';

export const nbViewItems = 20;
export const initialNavIdx = 0;

const LiveChartContext = createContext();

const getInitialEvents = () => Array.from(Array(50)).map((_, ix) => createRandomEvent(ix));

const initialData = () => {
    const events = getInitialEvents();
    return ({
        navIdx: initialNavIdx,
        navBackwardEnabled: events?.length - (nbViewItems + initialNavIdx + 1) >= 0,
        navForwardEnabled: initialNavIdx > 0,
        isPlaying: false,
        editing: null,
        events
    });}

const liveChartReducer = (state, action) => {
    switch (action.type) {
        case 'new_event': {
            if(state.isPlaying) {
                return {
                    ...state,
                    events: [...state.events, action.payload]
                }
            }
            return {...state}
        }
        case 'clean_event': {
            return {
                ...initialData(),
                events: getInitialEvents()
            }
        }
        case "nav_forward": {
            const navIdx = state.navIdx - 1;
            return {
                ...state,
                navIdx: nbViewItems + state.navIdx <= state.events.length ? navIdx : state.navIdx,
                navForwardEnabled: navIdx - 1 >= 0,
                navBackwardEnabled: navIdx <= state.events?.length
            };
        }
        case "nav_backward": {
            const navIdx = state.navIdx + 1;
            return {
                ...state,
                navIdx: state.events?.length - (nbViewItems + state.navIdx + 1) >= 0 ? navIdx : state.navIdx,
                navBackwardEnabled: navIdx + nbViewItems + 1 <= state.events?.length,
                navForwardEnabled: navIdx - 1 >= 0,
            }
        }
        case 'playing': {
            return {
                ...state,
                navIdx: 0,
                isPlaying: action.payload,
                editing: null
            }
        }
        case 'edit': {
            if(action.payload){
                return {
                    ...state,
                    isPlaying: false,
                    editing: {
                        id: action.payload.id,
                        value: state.events.find(e => e.index === action.payload.id)?.[action.payload.row],
                    }
                };
            }
            return {
                ...state, editing: null,
            }
        }
        case 'editing': {
            if(action.payload){
                return {
                    ...state,
                    editing: {
                        id: action.payload.id,
                        value: action.payload.value,
                    }
                };
            }
            return {
                ...state, editing: null,
            }
        }
        case 'editing_save': {
            const events = [...state.events];
            const index = events.findIndex(e => e.index === state.editing.id);
            events[index] = { ...events[index], value1: state.editing.value || 0 };
            return {
                ...state,
                events,
                editing: null
            }
        }
        case 'editing_reset': {
            return {
                ...state,
                editing: null,
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

const LiveChartProvider = ({ children }) => {
    const [data, dispatch] = useReducer(liveChartReducer, initialData());
    return (
        <LiveChartContext.Provider
            value={{
                data,
                dispatch
            }}>
            {children}
        </LiveChartContext.Provider>
    );
};

const useLiveChartContext = () => {
    const context = useContext(LiveChartContext);
    if (!context) {
        throw new Error('useLiveChartContext should be used within an LiveChartProvider');
    }

    return context;
};

export { LiveChartProvider, useLiveChartContext };
