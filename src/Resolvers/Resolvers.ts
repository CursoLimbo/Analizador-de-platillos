import {AdditionalSpotType} from "../types/AdditionalSpot";
import {GraphQLID, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";
import {AdditionalSpot} from "../models/AdditionalSpot";

const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Query root",

    fields: () => ({
        getAdditionalSpot: {
            type: AdditionalSpotType,
            args: {id: {type: GraphQLID}},
            async resolve(parent, args){
                return await AdditionalSpot.findById(args.id);
            }
        },

        getAllSpots: {
            type: AdditionalSpotType,
            async resolve(){
                return await AdditionalSpot.find();
            }
        }
    })
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields:{
        insertAdditionalSpot: {
            type: AdditionalSpotType,
            args: {name: {type: GraphQLString}, value: {type: GraphQLString}},
            async resolve(parent, args){
                const additionalSpotCreated = new AdditionalSpot({
                    name: args.name,
                    value: args.value
                });

                return additionalSpotCreated.save();
            }
        },

        deleteAdditionalSpot: {
            type: AdditionalSpotType,
            args: {id: {type:GraphQLID}},

            async resolve(parent, args){
                return await AdditionalSpot.findOneAndDelete({_id: args.id}).exec();
            }
        },

        updateAdditionalSpot: {
            type: AdditionalSpotType,
            args: {id: {type: GraphQLID}, name: {type: GraphQLString}, value: {type: GraphQLString}},

            async resolve(parent, args) {
                const filter = args.id;
                const update = {
                    name: args.name,
                    value: args.value
                };

                return await AdditionalSpot.findByIdAndUpdate({
                    filter, update
                }).exec();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: Mutation
})








