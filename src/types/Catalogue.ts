
const { GraphQLDate } = require('graphql-iso-date')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull

} = require('graphql');


export const CatalogueType = new GraphQLObjectType({
    name: "Catalogue",
    description: "This is a catalogue graphql account object",

    fields: ()=> ({
        name : {type: GraphQLNonNull(GraphQLString)},
        date: {type: GraphQLNonNull(GraphQLDate)},
        file:  {type: GraphQLNonNull(GraphQLString)}
    })
})