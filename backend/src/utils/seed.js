import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Employee from '../models/Employee.js';
import { hashPassword } from './auth.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Employee.deleteMany({});

    const employees = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: await hashPassword('admin123'),
        age: 30,
        class: 'Administration',
        subjects: ['Management', 'Operations', 'Leadership'],
        attendance: 95,
        role: 'admin',
        flagged: false
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: await hashPassword('password123'),
        age: 28,
        class: 'Engineering',
        subjects: ['JavaScript', 'React', 'Node.js'],
        attendance: 88,
        role: 'employee',
        flagged: false
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: await hashPassword('password123'),
        age: 26,
        class: 'Design',
        subjects: ['UI/UX', 'Figma', 'Adobe XD'],
        attendance: 92,
        role: 'employee',
        flagged: false
      },
      {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        password: await hashPassword('password123'),
        age: 32,
        class: 'Engineering',
        subjects: ['Python', 'Django', 'PostgreSQL'],
        attendance: 85,
        role: 'employee',
        flagged: true
      },
      {
        name: 'Sarah Williams',
        email: 'sarah@example.com',
        password: await hashPassword('password123'),
        age: 29,
        class: 'Marketing',
        subjects: ['Digital Marketing', 'SEO', 'Content Strategy'],
        attendance: 90,
        role: 'employee',
        flagged: false
      },
      {
        name: 'David Brown',
        email: 'david@example.com',
        password: await hashPassword('password123'),
        age: 35,
        class: 'Engineering',
        subjects: ['Java', 'Spring Boot', 'Microservices'],
        attendance: 87,
        role: 'employee',
        flagged: false
      },
      {
        name: 'Emily Davis',
        email: 'emily@example.com',
        password: await hashPassword('password123'),
        age: 27,
        class: 'Data Science',
        subjects: ['Python', 'Machine Learning', 'Data Analysis'],
        attendance: 93,
        role: 'employee',
        flagged: false
      },
      {
        name: 'Robert Martinez',
        email: 'robert@example.com',
        password: await hashPassword('password123'),
        age: 31,
        class: 'DevOps',
        subjects: ['Docker', 'Kubernetes', 'AWS'],
        attendance: 89,
        role: 'employee',
        flagged: false
      },
      {
        name: 'Lisa Anderson',
        email: 'lisa@example.com',
        password: await hashPassword('password123'),
        age: 25,
        class: 'Design',
        subjects: ['Graphic Design', 'Illustration', 'Branding'],
        attendance: 91,
        role: 'employee',
        flagged: false
      },
      {
        name: 'James Wilson',
        email: 'james@example.com',
        password: await hashPassword('password123'),
        age: 33,
        class: 'Product Management',
        subjects: ['Product Strategy', 'Agile', 'Scrum'],
        attendance: 94,
        role: 'employee',
        flagged: false
      },
      {
        name: 'Jennifer Taylor',
        email: 'jennifer@example.com',
        password: await hashPassword('password123'),
        age: 28,
        class: 'Engineering',
        subjects: ['TypeScript', 'Vue.js', 'GraphQL'],
        attendance: 86,
        role: 'employee',
        flagged: false
      },
      {
        name: 'William Moore',
        email: 'william@example.com',
        password: await hashPassword('password123'),
        age: 30,
        class: 'QA',
        subjects: ['Testing', 'Automation', 'Selenium'],
        attendance: 88,
        role: 'employee',
        flagged: true
      }
    ];

    await Employee.insertMany(employees);

    await mongoose.connection.close();
  } catch (error) {
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedData();
