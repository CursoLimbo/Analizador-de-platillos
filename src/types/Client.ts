
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull

} = require('graphql');


export const ClientType = new GraphQLObjectType({
    name: "Client",
    description: "This is a graphql client object",

    fields: ()=> ({
        name: {type: GraphQLNonNull(GraphQLString)},
        location: {type: GraphQLNonNull(GraphQLString)},
        phone: {type: GraphQLNonNull(GraphQLString)},
        whatsapp: {type: GraphQLNonNull(GraphQLString)},
        email: {type: GraphQLNonNull(GraphQLString)}
    })
})