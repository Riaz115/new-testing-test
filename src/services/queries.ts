import { gql } from "@apollo/client";

export const GET_ME = gql`
  query GetMe {
    me {
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

export const LIST_EMPLOYEES = gql`
  query ListEmployees(
    $page: Int
    $limit: Int
    $sortBy: SortInput
    $role: String
    $class: String
    $flagged: Boolean
    $search: String
  ) {
    listEmployees(
      page: $page
      limit: $limit
      sortBy: $sortBy
      role: $role
      class: $class
      flagged: $flagged
      search: $search
    ) {
      employees {
        id
        name
        email
        age
        class
        subjects
        attendance
        role
        flagged
        createdAt
        updatedAt
      }
      total
      page
      pages
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
      id
      name
      email
      age
      class
      subjects
      attendance
      role
      flagged
      createdAt
      updatedAt
    }
  }
`;
