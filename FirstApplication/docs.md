# Walkthrough

+ Installed and completed the frontend and backend setup using `vite+tsx` in the frontend and `js` in the backend.

### Apollo acts as a graphql service provider

+ Installed **apollo server and graphql** in backend using `npm i graphql @apollo/server`
+ Installed **apollo client and graphql** in backend using `npm i graphql @apollo/client`

## Server side:

+ `ApolloServer` takes an object as parameter with keys being `**typeDefs**` and `**resolvers**`.
+ `typeDefs` is a string that contains all the schemas.
  > `Query` is the default keyword to define schema of queries.


+ `resolvers` include callback functions that returns ressolves query. 