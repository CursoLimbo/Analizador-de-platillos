
import {UserType} from "./User";
import {GraphQLID} from "graphql";

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull

} = require('graphql');


export const BankAccountType = new GraphQLObjectType({
    name: "BankAccount",
    description: "This is a bank graphql account object",

    fields: ()=> ({
        bank : {type: GraphQLNonNull(GraphQLString)},
        accountNumber: {type: GraphQLNonNull(GraphQLString)},
        owner: {type: GraphQLNonNull(GraphQLID)}
    })
})