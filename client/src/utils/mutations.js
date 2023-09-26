import { gql } from "@apollo/client";

export const ADD_USER = gql`
mutation ADD_USER($username: String!, $email: String!, $password: String!){
    createUser(username: $username, email: $email, password: $password) {
        token
        user {
          id
          username
          email
        }
      }
}
`;

