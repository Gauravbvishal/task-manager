const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  startDate: {
    type: String,
    required: true,
    default: () => new Date().toISOString().split("T")[0]
  },
  content: { type: String, required: true },
  deadline: {
    type: String,
    required: true,
    default: () => new Date().toISOString().split("T")[0]
  }
}, { timestamps: true });


module.exports = mongoose.model('Task', taskSchema);