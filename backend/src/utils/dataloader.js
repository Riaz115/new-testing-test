import DataLoader from 'dataloader';
import Employee from '../models/Employee.js';

export const createEmployeeLoader = () => {
  return new DataLoader(async (ids) => {
    const employees = await Employee.find({ _id: { $in: ids } });
    const employeeMap = {};
    employees.forEach(emp => {
      employeeMap[emp._id.toString()] = emp;
    });
    return ids.map(id => employeeMap[id.toString()]);
  });
};
