import * as jwt from "express-jwt";
import express from 'express'
import { ApolloServer } from 'apollo-server-express' 
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {Authorized, buildSchema} from "type-graphql";
import {AdditionalSpotResolver} from "./Resolvers/AdditionalSpot-Resolver";
import {BankAccountResolver} from "./Resolvers/BankAccount-Resolver";
import {CatalogueResolver} from "./Resolvers/Catalogue-Resolver";
import {ClientResolver} from "./Resolvers/Client-Resolver";
import {DiscountResolver} from "./Resolvers/Discount-Resolver";
import {CompanyResolver} from "./Resolvers/Company-Resolver";
import {IngredientResolver} from "./Resolvers/Ingredient-Resolver";
import {ManagerResolver} from "./Resolvers/Manager-Resolve";
import {QuotationResolver} from "./Resolvers/Quotation-Resolver";
import {RecipeResolver} from "./Resolvers/Recipe-Resolver";
import {SupplierResolver} from "./Resolvers/Supplier-Resolver";
import {TypeOfQuoteResolver} from "./Resolvers/TypeOfQuote-Resolver";
import 'reflect-metadata';
import {expressjwt} from "express-jwt";
import {authChecker} from "./middleware/Auth";
import path from "path";

dotenv.config();

async function startApolloServer() {
    
    const app = express();

    const schema = await buildSchema({
        resolvers: [AdditionalSpotResolver, BankAccountResolver, CatalogueResolver, ClientResolver, CompanyResolver, DiscountResolver, IngredientResolver,
        ManagerResolver, QuotationResolver, RecipeResolver, SupplierResolver, TypeOfQuoteResolver],
        emitSchemaFile: true,
        validate: false,
        authChecker
    })


    const server = new ApolloServer({
       schema,
        context: ({ req }) => {
            const context = {
                req
            };

            return context;
        }
    });

    app.use(express.static(path.join(__dirname, "../Client/build")));
    app.get("/app*", function (_, res) {
        res.sendFile(
            path.join(__dirname, "../Client/build/index.html"),
            function (err) {
                res.status(500).send(err);
            }
        );
    });

    await server.start()

    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;
    await new Promise<void>(resolve => app.listen({ port: PORT },resolve))
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}

async function startMongoDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URI!)
        console.log('🟢 MongoDB connected!');
    }catch(error){
        console.error('🔴 MongoDB connection error:', error);
        process.exit(1);
    }
}

async function startServer(){
    await startMongoDB();
    await startApolloServer();
}

startServer();


