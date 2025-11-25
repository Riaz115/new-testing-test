import { verifyToken } from '../utils/auth.js';
import Employee from '../models/Employee.js';

export const authenticate = async (req) => {
  const authHeader = req.headers.authorization || '';

  if (!authHeader.startsWith('Bearer ')) {
    return { employee: null };
  }

  const token = authHeader.substring(7);
  const decoded = verifyToken(token);

  if (!decoded) {
    return { employee: null };
  }

  try {
    const employee = await Employee.findById(decoded.employeeId);
    return { employee };
  } catch (error) {
    return { employee: null };
  }
};

export const requireAuth = (employee) => {
  if (!employee) {
    throw new Error('Authentication required');
  }
};

export const requireAdmin = (employee) => {
  requireAuth(employee);
  if (employee.role !== 'admin') {
    throw new Error('Admin access required');
  }
};
