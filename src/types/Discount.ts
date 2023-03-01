import {GraphQLInt} from "graphql";

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,


} = require('graphql');


export const DiscountType = new GraphQLObjectType ({
    name: "Discount",
    description: "This is a ingredient graphql account object",

    fields: ()=> ({
        name: {type: GraphQLNonNull(GraphQLString)},
        percentage: {type: GraphQLNonNull(GraphQLInt)},
        description: {type: GraphQLNonNull(GraphQLString)}
    })
})
