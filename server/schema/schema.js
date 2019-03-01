const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../models/book');
const Author = require('../models/author');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql;

var books = [
    {name: "The wings of Fire", genre:"inspiration", id: '1', authorId: '1'},
    {name: "What's wrong in that place", genre:"horro", id:'2',authorId: '2'},
    {name: "Why I am a coder", genre:"inspiration", id:'3', authorId: '3'},
    {name: "GRaphQL Rocks", genre:"technology", id: '4', authorId: '2'},
    {name: "Blockchain is what", genre:"technology", id:'5',authorId: '3'},
    {name: "Cryptocurrency is future", genre:"technology", id:'6', authorId: '3'}
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
                // return _.find(authors, {id: parent.authorId})
                return Author.findById(parent.authorId);
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ()=>({
        id: { type:GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return _.filter(books, {authorId: parent.id})
                return Book.find({authorId: parent.id})
            }
        }
    })
})

//get queries
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        //book query
        book: {
            type: BookType,
            args: {id:{type: GraphQLID}},
            resolve(parent,args){
                // return _.find(books, {id: args.id})
                // return Book.find({})
                return Book.findById(args.id);
            }
        },
        //author query
        author:{
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // return _.find(authors, {id: args.id})
                return Author.findById(args.id)
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({})
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
                return Author.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields : {
        addAuthor:{
            type: AuthorType,
            args :{
                name: { type: GraphQLString},
                age: { type: GraphQLInt}
            },
            resolve(parent, args){
                var author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type:GraphQLString },
                authorId: { type: GraphQLID }
            },
            resolve(parent, args){
                var book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId : args.authorId
                });
                return book.save();
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

//Schema tasks
//1. Define object Types
//2. Define the relation between those object types
//3. Define how client interact with data from Object Type
