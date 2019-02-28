const graphql = require('graphql');
const _ = require('lodash');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
} = graphql;

var books = [
    {name: "The wings of Fire", genre:"inspiration", id: '1', authorId: '1'},
    {name: "What's wrong in that place", genre:"horro", id:'2',authorId: '2'},
    {name: "Why I am a coder", genre:"inspiration", id:'3', authorId: '3'}
]

var authors =[
    {name: "Nagraj manjule", age: 40, id: '1'},
    {name: "Sanjay lila Bhansali", age: 47, id: '2'},
    {name: "Raju hirani", age: 45, id: '3'}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, {id: parent.authorId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ()=>({
        id: { type:GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //book query
        book: {
            type: BookType,
            args: {id:{type: GraphQLID}},
            resolve(parent,args){
                return _.find(books, {id: args.id})
            }
        },
        //author query
        author:{
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id: args.id})
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
