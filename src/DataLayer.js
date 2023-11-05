import React, { createContext, useContext, useReducer } from "react";

// DATA LAYER !!!
export const DataLayerContext = createContext();

export const DataLayer = ({ reducer, initialState, children }) => (
    <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </DataLayerContext.Provider>
);

// COMPONENTS USABLE HOOK
export const useDataLayerValue = () => useContext(DataLayerContext);
