

const {

    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,


} = require('graphql');



export const CompanyType = new GraphQLObjectType({
    name: "company",
    description: "This is a company graphql account object",

    fields: ()=> ({
        name: {type:GraphQLNonNull(GraphQLString)},
        phone: {type:GraphQLNonNull(GraphQLString)},
        email: {type:GraphQLNonNull(GraphQLString)},
        logo: {type:GraphQLNonNull(GraphQLString)}
    })
})
