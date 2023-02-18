// Importamos gql de apollo-server-express
import { gql } from 'apollo-server-express';

// Definimos el schema de GraphQL utilizando gql para definir nuestros tipos
export const typeDefs = gql`
  type User {
    id: ID! 
    name: String! 
    email: String! 
    age: Int 
  }

  type Query {
    users: [User!]! 
    user(id: ID!):User!
    findUser(name: String!):User 
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User! 
    updateUser(id: ID!, name: String, email: String, age: Int): User! 
    deleteUser(id: ID!): User! 
  }
`;

