const express = require('express');
const cors = require('cors');
const app = express();

const Task=require('./models/Task');
const Taskroutes=require('./routes/taskroutes')
const connectDB = require('./configdb');

connectDB();

app.use(cors());
app.use(express.json());

app.use(Taskroutes);

app.listen(8000, () => {
  console.log('Server running on port 8000');
});
