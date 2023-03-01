/*import express from 'express';
import path from 'path';

const app = express()
const port = 5001


app.use(express.static(path.join(__dirname, "../Client/build")));
app.get("*", function (_, res) {
    res.sendFile(
        path.join(__dirname, "../Client/build/index.html"),
        function (err) {
            res.status(500).send(err);
        }
    );
});


app.get('/api', (req, res) => {
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})*/



import express from 'express'
import { ApolloServer } from 'apollo-server-express' 
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { typeDefs } from './schemas/schema';  
import { resolvers } from './resolvers/resolvers';
import path from "path";

dotenv.config();

async function startApolloServer() {
    
    const app = express();

    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    app.use(express.static(path.join(__dirname, "../Client/build")));
    app.get("/", function (_, res) {
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


