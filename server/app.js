const express = require('express');
const graphqlHTTP = require('express-graphql');
const port = process.env.PORT || 3000;

const schema = require('./schema/schema');
const app = express();

app.use('/graphql',graphqlHTTP({//'graphql' is an endpoint for client to use to make HTTP requests and queries to get data back 
    schema,
    graphiql:true
}))
app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
})