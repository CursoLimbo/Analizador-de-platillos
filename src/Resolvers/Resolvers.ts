import {AdditionalSpotType} from "../types/AdditionalSpot";
import {GraphQLID, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";
import {AdditionalSpot} from "../models/AdditionalSpot";
import {BankAccountType} from "../types/BankAccount";
import {BankAccount} from "../models/BankAccount";
import {CatalogueType} from "../types/Catalogue";
import {Catalogue} from "../models/Catalogue";
import {GraphQLISODateTime} from "type-graphql";

const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Query root",

    fields: () => ({
        getAdditionalSpot: {
            type: AdditionalSpotType,
            args: {id: {type: GraphQLID}},
            async resolve(parent, args){
                return await AdditionalSpot.findById(args.id).exec();
            }
        },

        getAllSpots: {
            type: AdditionalSpotType,
            async resolve(){
                return await AdditionalSpot.find().exec();
            }
        },

        getBankAccount: {
            type: BankAccountType,
            args: {id: {type: GraphQLID}},

            async resolve(parent, args){
                return await BankAccount.findById(args.id).exec();
            }
        },

        getAllBankAccounts: {
            type: BankAccountType,
            async resolve(){
                return await BankAccount.find().exec();
            }
        },

        getCatalogue: {
            type: CatalogueType,
            args: {id: {type: GraphQLID}},

            async resolve(parent, args){
                return await Catalogue.findById(args.id).exec();
            }
        },

        getAllCatalogues: {
            type: CatalogueType,
            async resolve(){
                return await Catalogue.find().exec();
            }
        },
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
        },

        insertBankAccount: {
            type: BankAccountType,
            args: {bank: {type: GraphQLString},  accountNumber: {type: GraphQLString}, owner: {type: GraphQLID}},
            async resolve(parent, args){
                const bankAccountCreated = new AdditionalSpot({
                    name: args.name,
                    value: args.value
                });

                return bankAccountCreated.save();
            }
        },

        deleteBankAccount: {
            type: BankAccountType,
            args: {id: {type:GraphQLID}},

            async resolve(parent, args){
                return await BankAccount.findOneAndDelete({_id: args.id}).exec();
            }
        },


        updateBankAccount: {
            type: BankAccountType,
            args: {id: {type: GraphQLID}, bank: {type: GraphQLString}, accountNumber: {type: GraphQLString}, owner: {type: GraphQLID}},

            async resolve(parent, args) {
                const filter = args.id;
                const update = {
                    bank: args.bank,
                    accountNumber: args.accountNumber,
                    owner: args.owner
                };

                return await BankAccount.findByIdAndUpdate({
                    filter, update
                }).exec();
            }
        },

        insertCatalogue: {
            type: CatalogueType,
            args: {name: {type: GraphQLString},  date: {type: GraphQLISODateTime}, file: {type: GraphQLID}},
            async resolve(parent, args){
                const catalogueCreated = new AdditionalSpot({
                    name: args.name,
                    date: args.date,
                    file: args.file
                });

                return catalogueCreated.save();
            }
        },

        deleteCatalogue: {
            type: CatalogueType,
            args: {id: {type:GraphQLID}},

            async resolve(parent, args){
                return await Catalogue.findOneAndDelete({_id: args.id}).exec();
            }
        },

        updateCatalogue: {
            type: CatalogueType,
            args: {id: {type: GraphQLID}, name: {type: GraphQLString}, date: {type: GraphQLString}, file: {type: GraphQLString}},

            async resolve(parent, args) {
                const filter = args.id;
                const update = {
                    name: args.name,
                    date: args.date,
                    file: args.file
                };

                return await Catalogue.findByIdAndUpdate({
                    filter, update
                }).exec();
            }
        },





    }
})

module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: Mutation
})








