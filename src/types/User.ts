import {BankAccountType} from "./BankAccount";


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull

} = require('graphql');



export const UserType = new GraphQLObjectType({
    name: "user",
    description: "This is a bank graphql account object",

    fields: ()=> ({
        name: {type:GraphQLNonNull(GraphQLString)},
        phone: {type:GraphQLNonNull(GraphQLString)},
        email: {type:GraphQLNonNull(GraphQLString)},
        whatsApp: {type:GraphQLNonNull(GraphQLString)},
        photo: {type:GraphQLNonNull(GraphQLString)},
        bankAccounts: {type: new GraphQLList(BankAccountType)}

    })
})