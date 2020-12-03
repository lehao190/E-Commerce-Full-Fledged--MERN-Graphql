import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation UserLogin($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            username
            email
            isAdmin
        }
    }
`;

export const REGISTER = gql`
    mutation UserRegister($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
        register(username: $username, email: $email, password: $password, confirmPassword: $confirmPassword) {
            id
            username
            email
            isAdmin
        }
    }
`;

export const LOGOUT = gql`
    mutation UserLogout {
        logOut {
            message
        }
    }
`;