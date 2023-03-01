
import {GraphQLInt} from "graphql";

const {

    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,


} = require('graphql');


export const IngredientType = new GraphQLObjectType ({
    name: "Ingredient",
    description: "This is a ingredient graphql account object",

    fields: ()=> ({
        name: {type: GraphQLNonNull(GraphQLString)},
        presentation: {type: GraphQLNonNull(GraphQLInt)},
        pricePerGram: {type: GraphQLNonNull(GraphQLInt)},
        yield: {type: GraphQLNonNull(GraphQLInt)},
        percentageOfYield: {type: GraphQLNonNull(GraphQLInt)},
        priceDecreased: {type: GraphQLNonNull(GraphQLInt)},
        productMultipliedByTwo: {type: GraphQLNonNull(GraphQLInt)},
        supplier: {type: GraphQLObjectType}
    })

})


