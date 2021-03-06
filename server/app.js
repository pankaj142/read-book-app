const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 3001;

const app = express();

//allow cross-origin requests
app.use(cors());

mongoose.connect('mongodb://localhost:27017/readBookDB');
mongoose.connection.once('open', ()=>{
    console.log("Database is connected");
})

const schema = require('./schema/schema');

app.use('/graphql',graphqlHTTP({//'graphql' is an endpoint for client to use to make HTTP requests and queries to get data back 
    schema,
    graphiql:true
}))
app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
})