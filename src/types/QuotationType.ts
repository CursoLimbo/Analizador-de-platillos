import {GraphQLInt, GraphQLList} from "graphql";
const { GraphQLDate } = require('graphql-iso-date')
import {AdditionalSpotType} from "./AdditionalSpot";
import {GraphQLISODateTime} from "type-graphql";

const {

    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,


} = require('graphql');


export const QuotationType = new GraphQLObjectType ({
    name: "Quotation",
    description: "This is a quotationType graphql account object",

    fields: ()=>({
        name: {type: GraphQLNonNull(GraphQLString)},
        additionalSpots: {type: GraphQLList(AdditionalSpotType)},
        contentTemplate: {type: GraphQLNonNull(GraphQLString)},
        termsAndConditions: {type: GraphQLNonNull(GraphQLString)},
        date: {type: GraphQLNonNull(GraphQLDate)},
        code: {type: GraphQLNonNull(GraphQLISODateTime)}

    })
})
