import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($emai: String!, $password: String!) {
    login(email: $email, password: $password){
        token
        user { 
            _id
            name
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password ){
token
user{
    _id
   username 
   email
   bookCount
   savedBooks
}
    }
}`;

export const SAVE_BOOK = gql`
mutation saveBook($input: BookInput!) {
saveBook(input: $input){
    bookId
    authors
    description 
    title
    image
    link
}
}`

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!) {
    removeBook(bookId: $ID!) {
        bookId
    authors
    description 
    title
    image
    link
    }
}`;