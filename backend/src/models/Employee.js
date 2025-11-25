import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 100
  },
  class: {
    type: String,
    required: true
  },
  subjects: [{
    type: String
  }],
  attendance: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  role: {
    type: String,
    enum: ['admin', 'employee'],
    default: 'employee'
  },
  flagged: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

employeeSchema.index({ name: 1 });
employeeSchema.index({ email: 1 });
employeeSchema.index({ role: 1 });
employeeSchema.index({ class: 1 });

export default mongoose.model('Employee', employeeSchema);
