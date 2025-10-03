const Task = require('../models/Task')
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.postTasks = async (req, res) => {
    try {
        const { task, startDate, content, deadline } = req.body;
        const newTask = new Task({ task, startDate, content, deadline });
        await newTask.save();
        console.log(startDate)
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deletetask = async (req, res, next) => {
    const id = req.params.id;
    console.log(id)
    const data = await Task.deleteOne({ _id: id });
    res.json(data);
    console.log(data);
}

exports.editTask = async (req, res, next) => {
    const id = req.params.id;
    const data = await Task.findById(id);
    res.json(data);
}

exports.searchtask = async (req, res, next) => {
    const data = req.body;
    const allTask = await Task.find();
    Object.values(allTask).forEach((items) => {
        if (items.task == data.data) {
            res.json(items)
            console.log(items)
        }
    })
    //   console.log(allTask)
}