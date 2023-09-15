import React,{ createContext, useContext,useState, ReactNode} from "react";



// defines the state of the context

interface IContext {
    ingredientsIDsArray: string[];
    setIngredientsIDsArray: React.Dispatch<React.SetStateAction<string[]>>;
}


// defines the context  

const Context = createContext<IContext>({} as IContext);

//create provider

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [ingredientsIDsArray, setIngredientsIDsArray] = useState<string[]>([]);


    return (
        <Context.Provider
            value={{
                ingredientsIDsArray,
                setIngredientsIDsArray,
            }}
        >
            {children}
        </Context.Provider>
    );
}

// hook access to the context

export const useContextData = () => useContext(Context);


