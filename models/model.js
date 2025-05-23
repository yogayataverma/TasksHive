import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  isCompleted: { type: Boolean, default: false },
  isImportant: { type: Boolean, default: false },
  isArchived:  { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
