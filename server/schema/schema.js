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

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: ()=>({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args){
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
                return Book.findById(args.id);
            }
        },
        //author query
        author:{
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
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

//create update delete queries
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
