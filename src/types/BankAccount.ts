import {GraphQLID, GraphQLInt} from "graphql";
import {UserType} from "./User";



const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull

} = require('graphql');


export const BankAccountType = new GraphQLObjectType({
    name: "Bank account",
    description: "This is a bank graphql account object",

    fields: ()=> ({
        bank : {type: GraphQLNonNull(GraphQLString)},
        accountNumber: GraphQLNonNull(GraphQLString),
        owner: GraphQLObjectType(UserType)
    })
})