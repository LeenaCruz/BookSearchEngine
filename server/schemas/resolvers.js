// const { createUser, saveBook, deleteBook } = require('../controllers/user-controller');
const {User} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: { 
     me: async (parent, args, context) => {
        if(context.user) {
            return User.findOne({_id: context.user._id});
        }
        throw AuthenticationError;
     }
    }, 

    Mutation: { 
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);

            return { token, user};
        }, 
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if(!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password)


            if (!correctPw) {
                throw AuthenticationError;
            }
            const token = signToken(user);
            return {token, user};
        }, 
        saveBook: async (parent, {user, body}, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    {_id: user._id},
                    { $addToSet: {savedBooks: body}}, 
                    {new: true, runValidators: true}
                );
            }
            throw AuthenticationError;
        },

        removeBook: async (parent, {user}, context) => { 
             if (context.user) { 
                return User.findOneAndUpdate({_id: user._id},
                    {$pull: {bookId: user}},
                    {new: true}
                );
             }
             throw AuthenticationError;
        }, 



    }
}

module.exports = resolvers;