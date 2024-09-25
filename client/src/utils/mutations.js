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
mutation createUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password )
}`
