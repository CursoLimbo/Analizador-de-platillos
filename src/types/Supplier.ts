const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLID

} = require('graphql');

export const SupplierType = new GraphQLObjectType({
    name: "Supplier",
    description: "This is a bank graphql account object",

    fields: ()=> ({
        name: {type: GraphQLNonNull(GraphQLString)},
        location: {type: GraphQLNonNull(GraphQLString)},
        phone: {type: GraphQLNonNull(GraphQLString)},
    })
})

