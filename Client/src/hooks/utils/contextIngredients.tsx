import React, { createContext, useContext, useState, ReactNode } from "react";

// defines the state of the context

interface IContext {
  ingredientsIDsArray: RecipeIngredient[];
  setIngredientsIDsArray: React.Dispatch<
    React.SetStateAction<RecipeIngredient[]>
  >;
  Recipe: Recipe;
  setRecipe: React.Dispatch<React.SetStateAction<Recipe>>;
  costConf: CostConf;
  setCostConf: React.Dispatch<React.SetStateAction<CostConf>>;
}

// defines the context

const Context = createContext<IContext>({} as IContext);

//create provider

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [ingredientsIDsArray, setIngredientsIDsArray] = useState<
    RecipeIngredient[]
  >([]);
  const [Recipe, setRecipe] = useState<Recipe>({
    name: "",
    portions: 0,
    procedure: "",
  });
  const [costConf, setCostConf] = useState<CostConf>({
    inflation: 0,
    IVA: 0,
    ISA: 0,
    utilities: 0,
    profits: 0,
  });

  return (
    <Context.Provider
      value={{
        ingredientsIDsArray,
        setIngredientsIDsArray,
        Recipe,
        setRecipe,
        costConf,
        setCostConf
      }}
    >
      {children}
    </Context.Provider>
  );
};

// hook access to the context

export const useContextData = () => useContext(Context);
