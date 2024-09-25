const typeDefs = `
type Query { 
me: User}

type User { 
_id: ID
username: String
email: String
bookCount: String
savedBooks: [Book]
}

type Book { 
bookId: String
authors: [String]
description: String
title: String
image: String
link: String
}

type Auth {
token: String
user: User}

input BookInput { 
bookId: String
authors: [String]
description: String
title: String
image: String
link: String
}

type Mutation { 
login(email: String!, password: String!): Auth
addUser(username:String!, email: String!, password:String!): Auth
saveBook(input: BookInput!): Book 
removeBook(bookId: ID!): User
}
`

module.exports = typeDefs;
