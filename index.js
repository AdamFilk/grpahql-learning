import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import _db from "./_db.js";

const resolvers = {
    Query: {
        games(){
            return _db.games
        },
        game(_,args){
            return _db.games.find((game) => game.id === args.id)
        },
        reviews(){
            return _db.reviews
        },
        review(_,args){
            return _db.reviews.find((review) => review.id === args.id)
        },
        authors(){
            return _db.authors
        },
        author(_,args){
            return _db.authors.find((author) => author.id === args.id)
        },
    },
    Game:  {
        reviews(parent){
            return _db.reviews.filter(r => r.game_id === parent.id);
        }
    },
    Author:  {
        reviews(parent){
            return _db.reviews.filter(r => r.author_id === parent.id);
        }
    },
    Review: {
        author(parent){
            return _db.authors.find(a => a.id === parent.author_id);
        },
        game(parent){
            return _db.games.find(a => a.id === parent.game_id);
        }
    },
    Mutation: {
        addGame(_,args){
           const game = {
                id: Math.floor(Math.random() * 1000).toString(),
                ...args.game
            }
            
            return game 
        },
        deleteGame(_,args){
            return _db.games.filter(game => game.id !== args.id);
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
});


const {url} = startStandaloneServer(server, {
    listen: 4000
});

console.log('Server is ready at port:', 4000)