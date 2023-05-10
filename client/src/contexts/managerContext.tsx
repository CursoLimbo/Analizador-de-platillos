import React, {PropsWithChildren, useState} from 'react';

export interface ManagerContextState {
    id?: string
    setId?: (id: string) => void
}

export const ManagerContext = React.createContext<ManagerContextState>({});

export const ManagerContextProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [managerId, setManagerId] = useState<string>();

    return (<ManagerContext.Provider value={{
            id: managerId, setId: (id) => {
                console.log("Cambio", id)
                setManagerId(id)
            }
        }}>
            {children}
        </ManagerContext.Provider>
    )
}












