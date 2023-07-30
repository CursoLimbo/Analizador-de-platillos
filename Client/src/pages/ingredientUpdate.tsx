import React,{useEffect, useState} from "react"
import { useForm } from "react-hook-form";
import { useGetIngredientById, useUpdateIngredientMutation } from "../hooks/services/Ingredients";


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

  interface IngredientsProps {
    id:string
  }



const IngredientUpdate : React.FC<IngredientsProps> = () =>{

    const [id,setId]= useState('')
    const [ingredient,setIngredient]=useState<IngredientFormData | null>(null)

    useEffect(() => {

        const currentUrl = new URL(window.location.href);
        const params = new URLSearchParams(currentUrl.search);
        const idUpdate = params.get('idUpdate');
        if(idUpdate){
            console.log ("IdUpdate:",id);
            setId(idUpdate)
        }
      });
        let updateIngredient = useGetIngredientById(id);
        console.log(updateIngredient.data)

        useEffect(()=>{
            if(updateIngredient && updateIngredient.data){
                console.log(updateIngredient.data)
                setIngredient(updateIngredient.data)
            }

        },[updateIngredient])
      


    




    return(
        <h1>{ingredient?.name+ ':' + id}</h1>
        
    )
}

export default IngredientUpdate;