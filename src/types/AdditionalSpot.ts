

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull

} = require('graphql');


export const AdditionalSpotType = new GraphQLObjectType({
    name: "Additional spot",
    description: "This is a additional spot graphql account object",

    fields: ()=> ({
        name : {type: GraphQLNonNull(GraphQLString)},
        value: GraphQLNonNull(GraphQLString)
    })
})