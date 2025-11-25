import dotenv from "dotenv";
import mongoose from "mongoose";
import Employee from "../models/Employee.js";
import { hashPassword } from "./auth.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Employee.deleteMany({});

    const employees = [
      {
        name: "Admin User",
        email: "admin@example.com",
        password: await hashPassword("admin123"),
        age: 30,
        class: "Administration",
        subjects: ["Management", "Operations", "Leadership"],
        attendance: 95,
        role: "admin",
        flagged: false,
      },

      {
        name: "First Employee",
        email: "firstemployee@example.com",
        password: await hashPassword("password123"),
        age: 30,
        class: "Software Engineering",
        subjects: ["Testing", "Automation", "Selenium"],
        attendance: 88,
        role: "employee",
        flagged: true,
      },
    ];

    await Employee.insertMany(employees);

    await mongoose.connection.close();
  } catch (error) {
    await mongoose.connection.close();
    process.exit(1);
  }
};

seedData();
