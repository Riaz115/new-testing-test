import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      employee {
        id
        name
        email
        age
        class
        subjects
        attendance
        role
        flagged
      }
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($input: EmployeeInput!) {
    addEmployee(input: $input) {
      id
      name
      email
      age
      class
      subjects
      attendance
      role
      flagged
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $input: UpdateEmployeeInput!) {
    updateEmployee(id: $id, input: $input) {
      id
      name
      email
      age
      class
      subjects
      attendance
      role
      flagged
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

export const TOGGLE_FLAG = gql`
  mutation ToggleFlag($id: ID!) {
    toggleFlag(id: $id) {
      id
      flagged
    }
  }
`;
