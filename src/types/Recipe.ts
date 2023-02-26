import mongoose from "mongoose";
import {GraphQLInt} from "graphql";
import {IngredientType} from "./Ingredient";

const {

    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,


} = require('graphql');


export const RecipeType = new GraphQLObjectType ({
    name: "Recipe",
    description: "This is a recipe graphql account object",

    fields: ()=> ({
        name: {type: GraphQLNonNull(GraphQLString)},
        preparation: {type: GraphQLNonNull(GraphQLString)},
        costTotalPerQuantity: {type: GraphQLNonNull(GraphQLInt)},
        percentageInflation: {type: GraphQLNonNull(GraphQLInt)},
        salesTax: {type: GraphQLNonNull(GraphQLInt)},
        serviceTax: {type: GraphQLNonNull(GraphQLInt)},
        utilities: {type: GraphQLNonNull(GraphQLInt)},
        revenue: {type: GraphQLNonNull(GraphQLInt)},
        unitCost: {type: GraphQLNonNull(GraphQLInt)},
        totalCost: {type: GraphQLNonNull(GraphQLInt)},
        ingredients: {type: GraphQLNonNull(GraphQLList(IngredientType))}
    })
})







