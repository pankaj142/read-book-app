const graphql = require('graphql');
const _ = require('lodash');
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

var books = [
    {name: "The wings of Fire", genre:"inspiration", id: 1},
    {name: "What's wrong in that place", genre:"horro", id:2},
    {name: "Why I am a coder", genre:"inspiration", id:3}
]
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=>({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id:{type: GraphQLString}},
            resolve(parent,args){
                return _.find(books, {id: 2})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})

//Schema tasks
//1. Define object Types
//2. Defien the relation between those object types
//3. Define how client interact with data from Object Type

