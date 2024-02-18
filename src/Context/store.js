import React, { useState, createContext } from "react";

export const AppContext = createContext();

export const Provider = ({ children }) => {
    const [userLog, setUserLog] = useState(null);
    const [idUserLog, setIdUserLog] = useState("");
    const [lists, setLists] = useState([]);





    return (
        <AppContext.Provider
            value={{
                userLog,
                setUserLog, idUserLog, setIdUserLog, lists, setLists

            }}
        >
            {children}
        </AppContext.Provider>
    );
};
