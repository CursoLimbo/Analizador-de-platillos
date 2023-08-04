import React, { useEffect, useState } from "react";
import { useGetIngredientById, useUpdateIngredientMutation } from "../hooks/services/Ingredients";
import { useRouter } from "next/router";

type IngredientFormData = {
  id: string;
  name: string;
  presentation: number;
  supplier: string;
  costPerGram: number;
  performance: number;
  performancePercentage: number;
  mermado: number;
  productMultiplyByTwo: number;
};

const IngredientUpdate: React.FC = () => {
  const router = useRouter();
  const { idUpdate } = router.query;
  const [id, setId] = useState<string>('');
  const [ingredient, setIngredient] = useState<IngredientFormData | undefined>(undefined);

  useEffect(() => {
    if (typeof idUpdate === "string") {
      setId(idUpdate);
      console.log('soy id: ' + idUpdate);
    }
  }, [idUpdate]);

  const { data: ingredientData, loading: ingredientLoading } = useGetIngredientById(id);

  useEffect(() => {
    if (ingredientData && !ingredientLoading) {
      setIngredient(ingredientData.getIngredient);
      console.log('soy data:', ingredientData.getIngredient);
    }
  }, [ingredientData, ingredientLoading]);


  

  return (
    <>
      <h1>{idUpdate}</h1>
      <h1>{ingredient?.name}</h1>
    </>
  );
};

export default IngredientUpdate;
