import Employee from "../models/Employee.js";
import { hashPassword, comparePassword, generateToken } from "../utils/auth.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

export const resolvers = {
  Query: {
    listEmployees: async (
      _,
      { page = 1, limit = 10, sortBy, role, class: className, flagged, search },
      { employee }
    ) => {
      requireAuth(employee);

      const query = {};
      if (role) query.role = role;
      if (className) query.class = className;
      if (typeof flagged === "boolean") query.flagged = flagged;

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { class: { $regex: search, $options: "i" } },
          { subjects: { $regex: search, $options: "i" } },
        ];
      }

      const sortOptions = {};
      if (sortBy) {
        sortOptions[sortBy.field] = sortBy.order === "ASC" ? 1 : -1;
      } else {
        sortOptions.createdAt = -1;
      }

      const skip = (page - 1) * limit;

      const [employees, total] = await Promise.all([
        Employee.find(query)
          .sort(sortOptions)
          .limit(limit)
          .skip(skip)
          .select("-password"),
        Employee.countDocuments(query),
      ]);

      return {
        employees,
        total,
        page,
        pages: Math.ceil(total / limit),
      };
    },

    employee: async (_, { id }, { employee, loaders }) => {
      requireAuth(employee);
      const emp = await loaders.employeeLoader.load(id);
      if (!emp) return null;
      return emp;
    },

    me: async (_, __, { employee }) => {
      requireAuth(employee);
      return employee;
    },
  },

  Mutation: {
    login: async (_, { email, password }) => {
      const employee = await Employee.findOne({ email });
      if (!employee) {
        throw new Error("Invalid credentials");
      }

      if (employee.flagged) {
        throw new Error(
          "Your account has been flagged. Please contact administrator."
        );
      }

      const valid = await comparePassword(password, employee.password);
      if (!valid) {
        throw new Error("Invalid credentials");
      }

      const token = generateToken(employee._id.toString());

      return {
        token,
        employee,
      };
    },

    addEmployee: async (_, { input }, { employee }) => {
      requireAdmin(employee);

      const existingEmployee = await Employee.findOne({ email: input.email });
      if (existingEmployee) {
        throw new Error("Email already exists");
      }

      const hashedPassword = await hashPassword(input.password);

      const newEmployee = new Employee({
        ...input,
        password: hashedPassword,
      });

      await newEmployee.save();
      return newEmployee;
    },

    updateEmployee: async (_, { id, input }, { employee }) => {
      if (employee.role !== "admin" && employee._id.toString() !== id) {
        throw new Error("Not authorized to update this employee");
      }

      if (input.role && employee.role !== "admin") {
        throw new Error("Only admins can change roles");
      }

      const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        { $set: input },
        { new: true, runValidators: true }
      ).select("-password");

      if (!updatedEmployee) {
        throw new Error("Employee not found");
      }

      return updatedEmployee;
    },

    deleteEmployee: async (_, { id }, { employee }) => {
      requireAdmin(employee);

      const deleted = await Employee.findByIdAndDelete(id);
      return !!deleted;
    },

    toggleFlag: async (_, { id }, { employee }) => {
      requireAdmin(employee);

      const emp = await Employee.findById(id);
      if (!emp) {
        throw new Error("Employee not found");
      }

      emp.flagged = !emp.flagged;
      await emp.save();

      return emp;
    },
  },

  Employee: {
    id: (parent) => parent._id.toString(),
  },
};
