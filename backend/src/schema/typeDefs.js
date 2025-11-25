export const typeDefs = `#graphql
  type Employee {
    id: ID!
    name: String!
    email: String!
    age: Int!
    class: String!
    subjects: [String!]!
    attendance: Float!
    role: String!
    flagged: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    employee: Employee!
  }

  type EmployeeList {
    employees: [Employee!]!
    total: Int!
    page: Int!
    pages: Int!
  }

  input EmployeeInput {
    name: String!
    email: String!
    password: String!
    age: Int!
    class: String!
    subjects: [String!]!
    attendance: Float
    role: String
  }

  input UpdateEmployeeInput {
    name: String
    age: Int
    class: String
    subjects: [String!]
    attendance: Float
    role: String
    flagged: Boolean
  }

  enum SortOrder {
    ASC
    DESC
  }

  input SortInput {
    field: String!
    order: SortOrder!
  }

  type Query {
    listEmployees(
      page: Int
      limit: Int
      sortBy: SortInput
      role: String
      class: String
      flagged: Boolean
      search: String
    ): EmployeeList!

    employee(id: ID!): Employee

    me: Employee
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!

    addEmployee(input: EmployeeInput!): Employee!

    updateEmployee(id: ID!, input: UpdateEmployeeInput!): Employee!

    deleteEmployee(id: ID!): Boolean!

    toggleFlag(id: ID!): Employee!
  }
`;
