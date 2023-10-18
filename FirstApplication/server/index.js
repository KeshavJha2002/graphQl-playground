import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server'
import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/';

const startServer = async() => {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
            type User {
                id: ID!,
                name: String!,
                username: String!,
                email: String!,
                phone: Int!,
                website: String!
            }

            type Todo {
                userId: ID!,
                id: ID!,
                title: String!,
                completed: Boolean!,
                user: User!
            }

            type Query {
                getTodos: [Todo],
                getUsers: [User],
                getUserById(id:ID!): User,
            }
        `,
        resolvers: {
            Todo: { // ###
                user: async(todo) => {
                    return (await axios.get(`${url}users/${todo.userId}`)).data;
                }
            },
            Query: {
                getTodos: async() => {
                    return (await axios.get(`${url}todos`)).data;
                },
                getUsers: async() => {
                    return (await axios.get(`${url}users`)).data;
                },
                getUserById: async(parent, { id }) => {
                    return (await axios.get(`${url}users/${id}`)).data;
                }
            }
        }
    });
    app.use(cors());
    app.use(bodyParser.json());
    await server.start();
    app.get('/', (req, res, next) => {
        try {
            res.send('Hello World');
        } catch (e) {
            next(e);
        }
    })
    app.use('/graphql', expressMiddleware(server))
    app.listen(4000, () => {
        console.log("Server is rendered in port 4000");
    })
}

startServer();