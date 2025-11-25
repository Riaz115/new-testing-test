# Employee Management System

A full-stack employee management application built with React, Node.js, Express, GraphQL, and MongoDB.

## Tech Stack

### Frontend

- React with TypeScript
- Apollo Client for GraphQL
- Tailwind CSS for styling
- Lucide React for icons
- Vite as build tool

### Backend

- Node.js with Express
- Apollo Server for GraphQL
- MongoDB with Mongoose
- JWT Authentication
- DataLoader for performance optimization

## Features

### Authentication & Authorization

- JWT-based authentication
- Role-based access control (Admin/Employee)
- Protected routes and mutations

### UI Components

- Responsive hamburger menu with submenu support
- Horizontal navigation menu
- Grid view for employee listing
- Tile view with more options menu (Edit, Flag, Delete)
- Detailed employee view with full information
- Modal dialogs for forms
- Pagination support

### Employee Management

- List employees with pagination
- Filter by role, class, flagged status
- Sort employees by any field
- Add new employees (Admin only)
- Edit employee details
- Delete employees (Admin only)
- Flag/unflag employees (Admin only)
- View detailed employee information

### Performance Optimizations

- DataLoader to prevent N+1 queries
- Database indexes on frequently queried fields
- Pagination for large datasets
- Field selection optimization

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file:

   ```bash
   cp .env.example .env
   ```

4. Configure environment variables in `.env`:

   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key_here
   PORT=4000
   ```

5. Start the backend server:

   ```bash
   npm run dev
   ```

   The GraphQL API will be available at `http://localhost:4000/graphql`

### Frontend Setup

1. From the project root directory, install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## Seeding the Database

To seed the database with sample data, you can use the GraphQL playground at `http://localhost:4000/graphql` and run these mutations:

```graphql
mutation {
  addEmployee(
    input: {
      name: "Admin User"
      email: "admin@example.com"
      password: "admin123"
      age: 30
      class: "Administration"
      subjects: ["Management", "Operations"]
      attendance: 95
      role: "admin"
    }
  ) {
    id
    name
    email
    role
  }
}

mutation {
  addEmployee(
    input: {
      name: "John Doe"
      email: "john@example.com"
      password: "password123"
      age: 28
      class: "Engineering"
      subjects: ["JavaScript", "React", "Node.js"]
      attendance: 88
      role: "employee"
    }
  ) {
    id
    name
    email
    role
  }
}
```

## Login Credentials

After seeding:

- Admin: admin@example.com / admin123
- Employee: john@example.com / password123

## Project Structure

### Frontend Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button/
│   ├── Input/
│   ├── Modal/
│   ├── HamburgerMenu/
│   ├── HorizontalMenu/
│   ├── EmployeeGrid/
│   ├── EmployeeTile/
│   ├── EmployeeTileGrid/
│   ├── EmployeeDetail/
│   ├── EmployeeForm/
│   ├── ViewToggle/
│   └── Pagination/
├── pages/              # Page components
│   ├── LoginPage.tsx
│   └── DashboardPage.tsx
├── context/            # React context
│   └── AuthContext.tsx
├── services/           # GraphQL queries and mutations
│   ├── queries.ts
│   └── mutations.ts
├── hooks/              # Custom React hooks
│   └── useEmployee.ts
├── lib/                # Library configuration
│   └── apolloClient.ts
└── App.tsx
```

### Backend Structure

```
backend/src/
├── models/             # Mongoose models
│   └── Employee.js
├── schema/             # GraphQL schema
│   └── typeDefs.js
├── resolvers/          # GraphQL resolvers
│   └── index.js
├── middleware/         # Express middleware
│   └── auth.js
├── utils/              # Utility functions
│   ├── auth.js
│   └── dataloader.js
├── config/             # Configuration files
│   └── database.js
└── index.js
```

## GraphQL API

### Queries

- `listEmployees`: List all employees with pagination, filtering, and sorting
- `employee(id)`: Get a single employee by ID
- `me`: Get current authenticated user

### Mutations

- `login`: Authenticate and get JWT token
- `addEmployee`: Create a new employee (Admin only)
- `updateEmployee`: Update employee details
- `deleteEmployee`: Delete an employee (Admin only)
- `toggleFlag`: Flag/unflag an employee (Admin only)

## Building for Production

### Frontend

```bash
npm run build
```

### Backend

```bash
cd backend
npm start
```
